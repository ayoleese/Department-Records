const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { table } = require('table');
const { mainQuestions, employeeQuestion, updateQuestion, roleQuestion, departmentQuestion, addManager } = require('./questions');
require("dotenv").config()

async function init() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: 'employee_db',
        });

        console.log('Connected to the employee_db database.');

        let userChoice = '';
        while (userChoice !== 'Quit') {
            try {
                const answers = await inquirer.prompt(mainQuestions);
                userChoice = answers.todoList;
                await handleUserChoice(userChoice, db);
            } catch (error) {
                console.error('Error handling user choice:', error);
            }
        }
        console.log('Exiting application.');
        await db.end(); // Close the database connection before exiting
        process.exit(0);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
async function handleUserChoice(choice, db) {
    switch (choice) {
        case 'View All Employees':
            const [employee] = await db.query('SELECT * FROM employee');
            console.log('All Employees:');
            console.table(employee);
            break;
            case 'Add Employee':
                const [rolesChoice] = await db.query('SELECT roles.id as value, roles.title as name FROM roles');
                const [managerChoice] = await db.query('SELECT manager.id as value, CONCAT(manager.first_name," ", manager.last_name) as name FROM manager')
                const employeeQuestion = [
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "What is the employee's first name?"
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "What is the employee's last name?"
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: rolesChoice
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: "What is the employee's manager?",
                        choices: managerChoice
                    },
                ]; 
                const employeeInput = await inquirer.prompt(employeeQuestion);
                const [employeeResult] = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[employeeInput.firstName, employeeInput.lastName, employeeInput.roleId, employeeInput.managerId]
                );
                console.log('Employee Added:', employeeResult);
                break;
            case 'Update Employee Role':
                const [updateRole] = await db.query('SELECT CONCAT(employee.first_name," ", employee.last_name) as name FROM employee')
                const [upChoice] = await db.query('SELECT roles.id as value, roles.title as name FROM roles');
                const updateQuestion = [
                    {
                        type: 'list',
                        name: 'firstName',
                        message: 'Which employee do you want to update?',
                        choices: updateRole
                    },
                    {
                        type: 'list',
                        name: 'title',
                        message: "What is the employee's new role?",
                        choices: upChoice
                    }
                ];
                const updateAnswer = await inquirer.prompt(updateQuestion);
                const [upResult] = await db.query('INSERT INTO employee (role_id) VALUE (?)', [updateAnswer.roleId]
                );
                console.log('Employee Role Updated:', upResult);
                break;
            case 'View All Roles':
                const [roles] = await db.query('SELECT * FROM roles');
                console.log('All Roles:');
                console.table(roles);
                break;
            case 'Add Role':
                const [departChoice] = await db.query('SELECT department.id as value, department.name as name FROM department')
                const roleQuestion = [
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the name of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?'
                    },
                    {
                        type: 'list',
                        name: 'departmentId',
                        message: 'Which department does the role belong to?',
                        choices: departChoice
                    },
                ];
                const roleAnswers = await inquirer.prompt(roleQuestion);
                const [roleInput] = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId]
                );
                console.log('New Role Added: ', roleInput);
                break;
            case 'View All Department':
                const [department] = await db.query('SELECT * FROM department');
                console.log('All Departments:');
                console.table(department);
                break;
            case 'Add Department':
                const departmentAnswers = await inquirer.prompt(departmentQuestion);
                const [results] = await db.query('INSERT INTO department (name) VALUES (?)',[departmentAnswers.departmentName]
                );
                console.log('Department Added: ', results);
                break;
            case 'View All Managers':
                const [manager] = await db.query('SELECT * FROM manager');
                console.log('All Managers:');
                console.table(manager);
                break;
            case 'Add Manager':
                const manAnswers = await inquirer.prompt(addManager);
                const [manResult] = await db.query('INSERT INTO manager (first_name, last_name) VALUES (?, ?)', [manAnswers.firstName, manAnswers.lastName]);
                console.log('New Manager Added: ', manResult);
                break;
        default:
            console.log('Invalid choice. Please choose a valid option.');
            break;
    }
}

init();
