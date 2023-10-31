// const { db }= require('./server')
// // const mysql = require('mysql2');
// const inquirer = require('inquirer')

// const questions = 
// [
//     {
//         type: 'list',
//         message: 'what would you like to do?',
//         name: 'options',
//         choices: ['View all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add a employee' ],
//         validate: (data)=>{ if(data) {return true} else{return 'i need a value to continue'}} 
//     }

// ];


// class employeeDatabase {
//  constructor(db){
//  this.db = db
//  }  
//  viewDepartment(){
//  db.query(`SELECT * FROM department`, function (err, results) {
//    console.table(results);
//      console.log(err)
      
//   })
// }
// viewRoles(){

//   db.query(`SELECT department_id, department_name, title, salary FROM department INNER JOIN role ON department.id = role.department_id;`, function (err, results) {
//     return console.table(results);
      
       
//    })
// }
// viewEmployees(){


// const viewEmployeesQuery = `SELECT  department_id, first_name, last_name, department_name, title, salary FROM employee
//                             INNER JOIN department ON employee.role_id= department.id
//                             INNER JOIN role ON employee.role_id = role.id`

// db.query( viewEmployeesQuery, function (err, results) {
//   if (err){
//     console.log(err)
//   } else{
//     console.table(results);
//   } 
// })
  

// };
// addDepartment(){

// };
// addRole(){

// };
// addEmployee(){

// };

// };
  

// function pickedOption(data){
//   const newOption = new employeeDatabase(data.db)
// if('View all departments' == data.options){
//   return newOption.viewDepartment()
// } else if('view all roles' == data.options){
//   return newOption.viewRoles
// } else if('view all employees' == data.options){
//   return newOption.viewEmployees()
// } else if('view all employees' == data.options){
//   return newOption.viewEmployees()
// } else if('add a department' == data.options){
//   return newOption.viewEmployees()
// } else if('add a role' == data.options){
//   return newOption.viewEmployees()
// }else if('add a employee' == data.options){
//   return newOption.viewEmployees()
// }
// };

// db.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + db.threadId);
//   init();
 
// });

// function init() {
//     inquirer
//        .prompt(questions)
//        .then((data) => {  
//          console.log(data)
//          pickedOption(data)
//          })
//        .catch((error) => {
//          if (error.isTtyError) {
//             console.log('Prompt couldnt be rendered in the current environment')
//          } else {
//            console.log('Something else went wrong')
//            console.error(error)
//          }
//        })  
//    };
   

// TEST CODE!!!!!!!!!!