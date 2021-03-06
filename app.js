const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array that will store rendered employees
const employees = [];

// inititial function that runs program
function init() {
  addManager(); //each team requires a manager
};

init();
// --------------------------------------------------------------------

// this function asks the user if they would like to add a new member, then directs them to the function that handles further input questions
function askToAdd() {
  const ask = [
    {
      type: "input",
      message: "Would you like to add another team member?",
      name: "anotherMember"
    }
  ];
  inquirer.prompt(ask).then((res) => {
    let upper = res.anotherMember.toUpperCase();
    switch(upper) {
      case "Y":
      case "YES":
        whichMember();
        break;
      case "N":
      case "NO":
        console.log("Generating team info...")
        // this renders the file!!!
        renderFile(outputPath, render(employees));
        console.log("Please check the output directory for your file.")
        break;
      default:
        console.log("Please enter 'yes' or 'no'.");
        askToAdd();
    }
  });
};

// this function determines which type of member will be added
function whichMember() {
  const memberQ = [
    {
      type: "input",
      message: "Would you like to add an engineer or an intern?",
      name: "memberType"
    }
  ];
  inquirer.prompt(memberQ).then((res) => {
    let upperRes = res.memberType.toUpperCase();
    switch(upperRes) {
      case "ENGINEER":
        addEngineer();
        break;
      case "INTERN":
        addIntern();
        break;
      default:
        console.log("Please enter 'engineer' or 'intern'.");
        whichMember();
    }
  });
};

// this function asks user for manager info and pushes to employees array then runs askToAdd function above
function addManager() {
  const questions = [
    {
      type: "input",
      message: "What is the name of the manager of this team?",
      name: "managerName"
    },
    {
      type: "input",
      message: "What is the manager's ID?",
      name: "managerId"
    },
    {
      type: "input",
      message: "What is the manager's email?",
      name: "managerEmail"
    },
    {
      type: "input",
      message: "What is the manager's office number?",
      name: "managerOffice"
    }
  ];
  inquirer.prompt(questions).then((res) => {
    const person = new Manager(
      res.managerName,
      res.managerId,
      res.managerEmail,
      res.managerOffice
    );
      employees.push(person);
      console.log("Manager added.")
      askToAdd();
  });
};

// this function asks for engineers info and pushes to employees array then runs askToAdd function above
function addEngineer() {
  const questions = [
    {
      type: "input",
      message: "What is the engineer's name?",
      name: "engineerName"
    },
    {
      type: "input",
      message: "What is the engineer's ID?",
      name: "engineerId"
    },
    {
      type: "input",
      message: "What is the engineer's email?",
      name: "engineerEmail"
    },
    {
      type: "input",
      message: "What is the engineer's GitHub username?",
      name: "engineerGithub"
    }
  ];
  inquirer.prompt(questions).then((res) => {
    const person = new Engineer(
      res.engineerName,
      res.engineerId,
      res.engineerEmail,
      res.engineerGithub
    );
      employees.push(person);
      console.log("Engineer added.")
      askToAdd();
  });
};

// this function asks for interns info and pushes to employees array then runs askToAdd function above
function addIntern() {
  const questions = [
    {
      type: "input",
      message: "What is the intern's name?",
      name: "internName"
    },
    {
      type: "input",
      message: "What is the intern's ID?",
      name: "internId"
    },
    {
      type: "input",
      message: "What is the intern's email?",
      name: "internEmail"
    },
    {
      type: "input",
      message: "What school does the intern attend?",
      name: "internSchool"
    }
  ];
  inquirer.prompt(questions).then((res) => {
    const person = new Intern(
      res.internName,
      res.internId,
      res.internEmail,
      res.internSchool
    );
      employees.push(person);
      console.log("Intern added.")
      askToAdd();
  });
};

// this function renders a completed team file
function renderFile(path, data) {
  return fs.writeFileSync(path, data);
};