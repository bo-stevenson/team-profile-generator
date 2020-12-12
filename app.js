const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];
async function generateTeam() {
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter Employee name: "
        },

        {
            type: 'input',
            name: 'id',
            message: "Enter Employee's ID number: ",
        },

        {
            type: 'input',
            name: 'email',
            message: "Enter Employee's email address: ",
        },

        {
            type: 'list',
            name: 'role',
            message: "What is the Employee's job?",
            choices: ["Manager", "Engineer", "Intern"],
        },
    ])
    
    switch (employee.role) {
        case "Manager":
            const officeNumber = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: "Enter employee's office number: ",
                }])
                teamMember = new Manager (employee.name, employee.id, employee.email, officeNumber.officeNumber);
                team.push(teamMember);
                addTeam();
            return;
        case "Engineer":
            const github = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'githubAcc',
                    message: "Enter employee's GitHub username: ",
                }])
                teamMember = new Engineer (employee.name, employee.id, employee.email, github.githubAcc);
                team.push(teamMember);
                addTeam();
            return;

        case "Intern":
            const school = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'schoolName',
                    message: "Enter employee's place of study: ",
                }])
                teamMember = new Intern (employee.name, employee.id, employee.email, school.schoolName);
                team.push(teamMember);
                addTeam();
            return;

        default:
            console.log("Error!");
                return;

        }
        function addTeam(){
            
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'addMember',
                    message: "Add another employee?"
                }
            ]).then(function ({addMember}){
            if(addMember){
                generateTeam();
            }else{
                render(team);
                fs.writeFile(outputPath, render(team), (err) => {
                    if (err){
                        throw err;
                    }
                    console.log("Successfully wrote html!");
                });
            }
        }).catch((err) => {
            if (err){
                console.log("Error: ", err);
            }
        })
    }
            
     
        

}


generateTeam();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
