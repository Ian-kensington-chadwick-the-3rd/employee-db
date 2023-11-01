INSERT INTO department (department_name) VALUES 
('Engineering') , ('Finance'), ('Legal'), ('Sales'); 

INSERT INTO role (title, salary, department_id) VALUES 
('Sales Lead', 10000.0333,1), 
('Finance Deputy', 1000000.234,2), 
('Legal Chad',10000000.324,3),
('sales marketer',75000.435,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('greg', 'shallswick',1,1), 
('jared', 'leto',2,2), 
('groot','malcum',3,3), 
('dave', 'myers',4,2);

select * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

