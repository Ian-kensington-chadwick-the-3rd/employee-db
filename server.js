const inquirer = require('inquirer')
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'Godbless1!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  ).promise()
 db.query('SELECT * FROM employee_db', function (err, results) {
    console.log(results);
  });
  





  //   db.query(`DELETE FROM favorite_books WHERE id = ?` (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
  
  // Query database
 
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  