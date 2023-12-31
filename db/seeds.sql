INSERT INTO department(id, name)
VALUES 
(1, "Engineering"),
(2, "Finance"),
(3, "Legal"),
(4, "Sales");

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 80000, 4),
("Salesperson", 50000, 4),
("Lead Engineer", 100000, 1),
("Software Engineer", 75000, 1),
("Account Manager", 60000, 2),
("Accountant", 55000, 2),
("Legal Team Lead", 90000, 3),
("Lawyer", 75000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("John", "Doe", 1),
("Jane", "Doe", 2),
("Bugs", "Bunny", 3),
("Lola", "Bunny", 4);

INSERT INTO manager (first_name, last_name, employee_id)
VALUES
("Anakin", "Skywalker", 1),
("Bilbo", "Baggins", 2),
("Bruce", "Wayne", 3),
("Charlie", "Brown", 4);

