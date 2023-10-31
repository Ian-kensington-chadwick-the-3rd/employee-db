INSERT INTO department (department_name) VALUES 
('Engineering') , ('Finance'), ('Legal'), ('Sales'); 

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 10000.0333,1), 
('Finance', 1000000.234,2), 
('Legal',10000000.324,3),
('sales',75000.435,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('greg', 'shallswick',1,3), 
('jared', 'leto',2,3), 
('groot','malcum',3,2), 
('dave', 'myers',4,2);

select * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

