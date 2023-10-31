const inquirer = require('inquirer')
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;


const viewDepartmentQuery = `SELECT * FROM department`
const viewRoleQuery = `SELECT department_id, department_name, title, salary FROM department INNER JOIN role ON department.id = role.department_id;`
const viewEmployeesQuery = `SELECT  e.id, e.first_name, e.last_name, d.department_name, r.title, r.salary, m.first_name
                            FROM employee e
                            INNER JOIN department d ON e.role_id= d.id
                            INNER JOIN role r ON e.role_id = r.id
                            JOIN employee m ON e.manager_id = m.id;`

// const viewEmployeesQuery =  SELECT department.id, first_name, last_name, department_name, title, salary, manager_id FROM employee
//                               INNER JOIN department ON employee.role_id= department.id
//                               INNER JOIN role ON employee.role_id = role.id

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)

  );
 
  db.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + db.threadId);
  init();
 
});
 
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
const questions = 
[
    {
        type: 'list',
        message: 'what would you like to do?',
        name: 'options',
        choices: ['View all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add a employee' ],
        validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
    }

];

function init() {
    inquirer
       .prompt(questions)
       .then((data) => {  
         console.log(data)
         pickedOption(data)
         })
       .catch((error) => {
         if (error.isTtyError) {
            console.log('Prompt couldnt be rendered in the current environment')
         } else {
           console.log('Something else went wrong')
           console.error(error)
         }
       })  
   };

class employeeDatabase {
 constructor(db){
 this.db = db
 };  
   viewDepartment(){
   db.query(viewDepartmentQuery ,  (err, results) => {
    if (err){
      console.log(err);
    } else{
      console.table(results);
      init();
    } 
  })
};
   viewRoles(){
   db.query(viewRoleQuery, function (err, results) {
    if (err){
      console.log(err);
    } else{
      console.table(results);
      init();
    } 
  })
};
  viewEmployees(){
  db.query( viewEmployeesQuery, function (err, results) {
  if (err){
    console.log(err);
  } else{
    console.table(results);
    init();
  } 
})
};
addDepartment(){
inquirer
   .prompt([
    {
        type: 'input',
        message: 'what would you like your department name to be?',
        name: 'newDepartment',
        validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
    }
    ]).then((data) => {  
      console.log(data)
     
      const sql = `INSERT INTO department (department_name) VALUES (?)
      `
      db.query( sql, data.newDepartment, (err, results) => {
        if (err){
          console.log(err);
        } else{
          console.log(results);
          console.log("affectedRows: ", results.affectedRows);
          init();
      }
    })
    })
};
addRole(){
  inquirer
  .prompt([
   {
       type: 'input',
       message: 'what is the name of your role?',
       name: 'newRole',
       validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'number',
    message: 'what is the salary of the role?',
    name: 'newSalary',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },  
   {
    type: 'input',
    message: 'which department does the role belong to?',
    name: 'newDepartment',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },  
   ]).then((data) => {  
     console.log(data)
    
     const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`

     db.query( sql, [data.newRole, data.newSalary, data.newDepartment] , (err, results) => {
       if (err){
         console.log(err);
       } else{
         console.log(results);
         console.log("affectedRows: ", results.affectedRows);
         init();
     }
   })
   })
};
addEmployee(){
  inquirer
  .prompt([
   {
       type: 'input',
       message: 'What is the employees first name?',
       name: 'employeeFirstName',
       validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'input',
    message: 'What is the employees last name?',
    name: 'employeeLastName',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'input',
    message: 'What is the employees role?',
    name: 'employeeRole',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'input',
    message: 'Who is the employees manager(id)?',
    name: 'employeeManager',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   ]).then((data) => {  
     console.log(data)
     const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
     db.query( sql, [data.employeeLastName, data.employeeLastName, data.employeeRole, data.employeeManager] , (err, results) => {
      if (err){
        console.log(err);
      } else{
        console.log(results);
        console.log("affectedRows: ", results.affectedRows);
        init();
    }
    })
    })
};

};
  





function pickedOption(data){
  const newOption = new employeeDatabase(data.db)
if('View all departments' == data.options){
  return newOption.viewDepartment() //
} else if('view all roles' == data.options){
  return newOption.viewRoles() //
} else if('view all employees' == data.options){
  return newOption.viewEmployees() //
} else if('add a department' == data.options){
  return newOption.addDepartment() // 
} else if('add a role' == data.options){
  return newOption.addRole()  //
} else if('add a employee' == data.options){
  return newOption.addEmployee() //
}else if('add a employee' == data.options){
  return newOption.viewEmployees()
}
};

