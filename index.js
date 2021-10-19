// packages 'required' for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Internal module
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions needed to generate the README
// type: 'input' ommitted as it is the default setting for prompt.
const questions = [
    {
        message: "Title of your project?",
        name: 'title',
        default: 'My README file',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
            }
    },
    {
        message: "Provide a description of your project.",
        name: 'description',
        default: 'Write a little about this project.',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
            }
    },
    {
        message: "Provide the installation instructions.",
        name: 'installation',
        default: 'Download the zip file from GitHub and install from your local drive.',
    },
    {
        message: "GitHub username? (...just your username)",
        name: 'username',
        default: 'Mark33Mark',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
            }
    },
    {
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        default: 'your-github-repo-name',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
            }
    },
    {
        type: 'list',
        message: "Select a license for your project.",
        name: 'license',
        choices: [new inquirer.Separator('=== Apache, MIT, Mozilla ='),'Apache License 2.0', 'MIT License', 'Mozilla Public License 2.0', new inquirer.Separator('=== BSD ='), 'BSD 2-clause \'simplified\' license', 
        'BSD 3-clause \'new\' or \'revised\' license', new inquirer.Separator('=== GNU ='), 'GNU General Public License v3.0', 'GNU Affero General Public License v3.0', 
        'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', new inquirer.Separator('=== Other =' ), 'Boost Software License 1.0', 
        'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'The Unlicense' ],
    }
];

// Create the README.md file
writeToFile = ( fileName, data ) => {
    fs.writeFile( fileName, data, err => {
        if (err) { 
            return console.log(err); 
        } else {
        console.log("Success! Your README.md file has been generated");
        }
    });
};

// Initialise app
init = () => {
    inquirer
        .prompt(questions)
        .then((userResponse) => {
            console.info("Your answers: ", userResponse);
    
            // Pass userResponse to generateMarkdown module
            console.log("Now generating your README.md file...");

            const createFile = generateMarkdown( userResponse );
            console.log( createFile );
            writeToFile( 'your_README.md', createFile );
        });
    };

// Function call to initialize app
init();
