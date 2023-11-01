const inquirer = require('inquirer')
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;

// some of my querys to clean up code
const viewDepartmentQuery = `SELECT * FROM department`
const viewRoleQuery = `SELECT department_id, department_name, title AS role, salary FROM department INNER JOIN role ON department.id = role.department_id;`
const viewEmployeesQuery = 
`SELECT  
d.id, e.manager_id, e.role_id, e.first_name, e.last_name, d.department_name, r.title AS role, r.salary, CONCAT(m.first_name, ' ',m.last_name) AS manager
FROM employee e
INNER JOIN department d ON e.role_id= d.id
INNER JOIN role r ON e.role_id = r.id
JOIN employee m ON e.manager_id = m.id
ORDER BY d.id;`


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// connection
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)

  );
//  what function ill first run when i connect
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
  // my questions for my first inquirer when you first load up the page
const questions = 
[
    {
        type: 'list',
        message: 'what would you like to do?',
        name: 'options',
        choices: ['View all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add a employee','update employee', 'sum of all departments','FIRE EVERYONE WE GOING BANKRUPT JUST LIKE 2008!!!!!!!', 'nvm lets just fire one guy' ],
        validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
    }

];
// first function that will be ran
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
// employee database that holds all my methods through a class 
class employeeDatabase {
 constructor(db){
 this.db = db
 };  
//  viewing all of my departments
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
// viewing all my roles
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
// viewing all my employees
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
// adding a department
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
// adding a role
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
    type: 'number',
    message: 'which department does the role belong to enter (id)?',
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
// adding an employee
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
    message: 'What is the employees role (choose from role_id int)?',
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
     db.query( sql, [data.employeeFirstName, data.employeeLastName, data.employeeRole, data.employeeManager] , (err, results) => {
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
// updating my employee
updateEmployee(){
inquirer
.prompt([
   {
       type: 'number',
       message: 'What is the employees that you want to update? (has to be an int)',
       name: 'employeeID',
       validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'input',
    message: 'What is the employees new manager(id)?',
    name: 'employeeManager',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   {
    type: 'input',
    message: 'what is the employees newRole(id)',
    name: 'employeeRole',
    validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
   },
   ]).then((data) => {  
    console.log(data)
   
    const sql = `UPDATE employee SET role_id=? WHERE id=?`

    db.query( sql, [data.employeeRole, data.employeeID] , (err, results) => {
      if (err){
        console.log(err);
      } else{
        console.log(results);
        console.log("affectedRows: ", results.affectedRows);
        init();
    }
  })
   })
 
}
// sum of all my departments
sumDepartments(){
 const sql = 
`SELECT d.department_name, SUM(r.salary) AS total_budget
 FROM
 employee e
 JOIN role r ON e.role_id = r.id
 JOIN department d ON  r.department_id = d.id
 GROUP BY
 d.department_name;`
      
      db.query( sql, (err, results) => {
        if (err){
          console.log(err);
        } else{
          console.table(results);
          console.log("affectedRows: ", results.affectedRows);
          init();
      }
    })
}
// only fire one employee
fireOnePerson(){
  inquirer
   .prompt([
    {
        type: 'input',
        message: 'fire an employee by first_name',
        name: 'fireEmployee',
        validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
    }
    ]).then((data) => {  
      console.log(data)
  const sql = 
  `DELETE FROM employee
  WHERE first_name = (?)`
  db.query( sql, data.fireEmployee, (err, results) => {
    if (err){
      console.log(err);
    } else{
      console.table(results);
      console.log("affectedRows: ", results.affectedRows);
      init();
  }})
})
};
// firing every employee
fireEveryOne(){
  const sql = 
  `DELETE FROM employee`
  db.query( sql, (err, results) => {
    if (err){
      console.log(err);
    } else{
      console.table(results);
      console.log("affectedRows: ", results.affectedRows);
      init();
  }
})

};

};

  // how my options will be picked and my functions returned depending on which option the user chooses
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
}else if('update employee' == data.options){
  return newOption.updateEmployee()
}else if('sum of all departments' == data.options){
  return newOption.sumDepartments()
}else if('FIRE EVERYONE WE GOING BANKRUPT JUST LIKE 2008!!!!!!!' == data.options){
  return newOption.fireEveryOne()
} else if('nvm lets just fire one guy' == data.options){
  return newOption.fireOnePerson()
}
}






// employeeChoice(){
//     db.query(`SELECT * FROM employee` ,  (err, results) => {
//      if (err){
//        console.log(err);
//      } else{
//        console.table(results);
//       const employeeOption = results.map(({id, first_name, last_name}) => ({
//         name:`${first_name} ${last_name}`,
//         value: id
         
//       }))
//       return employeeOption
//      }})
     
// }
//  var employeeChoice = this.employeeChoice()

// const viewEmployeesQuery =  SELECT department.id, first_name, last_name, department_name, title, salary, manager_id FROM employee
//                               INNER JOIN department ON employee.role_id= department.id
//                               INNER JOIN role ON employee.role_id = role.id
