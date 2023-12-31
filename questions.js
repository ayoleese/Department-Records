
const mainQuestions = [
    {
        type: 'list',
        name: 'todoList',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Department', 'Add Department', 'View All Managers', 'Add Manager', 'Quit']
    }
];

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
        name: 'role',
        message: "What is the employee's role?",
        choices: [("")],
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "What is the employee's manager?",
        choices: [("")],
    },
];

const updateQuestion = [
    {
        type: 'input',
        name: 'assignedRole',
        message: 'Which role do you want to assign the selected employee?'
    },
];
const roleQuestion = [
    {
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'departmentRole',
        message: 'Which department does the role belong to?',
        choices: [("")]
    },
];

const departmentQuestion = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the Department?',
    }
];
const addManager = [
    {
        type: 'input',
        name: 'managerFirstName',
        message: "What is the manager's first name?"
    },
    {
        type: 'input',
        name: 'managerLastName',
        message: "What is the manager's last name?"
    },
];

module.exports = {
    mainQuestions,
    employeeQuestion,
    updateQuestion,
    roleQuestion,
    departmentQuestion,
    addManager,
};
