const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const { table } = require('table');
const { mainQuestions, employeeQuestion, updateQuestion, roleQuestion, departmentQuestion, addManager } = require('./questions');

async function init() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Lsl110988',
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
                const employeeInput = await inquirer.prompt(employeeQuestion);
                const [employeeResult] = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',[employeeInput.firstName, employeeInput.lastName, employeeInput.roleId, employeeInput.managerId]
                );
                console.log('Employee Added:', employeeResult);
                break;
            case 'Update Employee Role':
                const updateAnswers = await inquirer.prompt(updateQuestion);
                console.log('Role Updated: ', updateAnswers);
                break;
            case 'View All Roles':
                const [roles] = await db.query('SELECT * FROM roles');
                console.log('All Roles:');
                console.table(roles);
                break;
            case 'Add Role':
                const roleAnswers = await inquirer.prompt(roleQuestion);
                const [roleInput] = await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [roleAnswers.title, roleAnswers.salary, roleAnswers.departmentId]
                );
                console.log('New Role Added: ', roleAnswers);
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
                inquirer.prompt(addManager)
                    .then((managerAnswers) => {
                        console.log('Manager Added: ', managerAnswers);
                    });
                break;
        default:
            console.log('Invalid choice. Please choose a valid option.');
            break;
    }
}

init();
