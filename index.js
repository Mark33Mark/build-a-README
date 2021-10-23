
/*
CONSOLE COLOR CODES
        FOREGROUND                          BACKGROUND                          GENERAL
        FgBlack     = "\x1b[30m"            BgBlack     = "\x1b[40m"            Reset       = "\x1b[0m"
        FgRed       = "\x1b[31m"            BgRed       = "\x1b[41m"            Bright      = "\x1b[1m"
        FgGreen     = "\x1b[32m"            BgGreen     = "\x1b[42m"            Dim         = "\x1b[2m" 
        FgYellow    = "\x1b[33m"            BgYellow    = "\x1b[43m"            Underscore  = "\x1b[4m"
        FgBlue      = "\x1b[34m"            BgBlue      = "\x1b[44m"            Blink       = "\x1b[5m"
        FgMagenta   = "\x1b[35m"            BgMagenta   = "\x1b[45m"            Reverse     = "\x1b[7m" 
        FgCyan      = "\x1b[36m"            BgCyan      = "\x1b[46m"            Hidden      = "\x1b[8m" 
        FgWhite     = "\x1b[37m"            BgWhite     = "\x1b[47m"
*/



// packages "required" for this application
const inquirer = require("inquirer");
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')
const fs = require("fs");

// Internal module
const generateMarkdown = require("./utils/generateMarkdown.js");

const banner =
// ASCII art generated using: https://textkool.com/en/test-ascii-art-generator
`\n\x1b[47m\x1b[32m     _             _     _                   ____  _____    _    ____  __  __ _____      \x1b[0m
\x1b[47m\x1b[32m    | |__  _   _(_) | __| |       __ _      |  _ \\| ____|  / \\  |  _ \\|  \\/  | ____|     \x1b[0m
\x1b[47m\x1b[32m    | "_ \\| | | | | |/ _  |_____ / _  |_____| |_) |  _|   / _ \\ | | | | |\\/| |  _|       \x1b[0m
\x1b[47m\x1b[32m    | |_) | |_| | | | (_| |_____| (_| |_____|  _ <| |___ / ___ \\| |_| | |  | | |___      \x1b[0m
\x1b[47m\x1b[32m    |_.__/ \\__,_|_|_|\\__,_|      \\__,_|     |_| \\_\\_____/_/   \\_\\____/|_|  |_|_____|     \x1b[0m
\x1b[47m\x1b[32m                                                                                         \x1b[47m
\x1b[0m`;

// Array of questions needed to generate the README
// type: "input" ommitted as it is the default setting for prompt.
const questions = [
    {
        message: "\nQ1 of 12.\n   Title of your project?",
        name: "title",
        default: "<PLACEHOLDER> Project Title",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
            }
    },
    {
        message: "\nQ2 of 12.\n   Description for your application?",
        name: "description",
        default: "\n\t<PLACEHOLDER> \n\tYour motivation? \n\tWhy build this? \n\tWhat problem does it solve?" + 
                    "\n\tWhat did you learn \n\tKey features of the application?",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
            }
    },
    {
        message: "\nQ3 of 12.\n   Installation instructions?",
        name: "installation",
        default: "<PLACEHOLDER> Step-by-step description of how to get the development environment running.",
    },
    {
        message: "\nQ4 of 12.\n   Usage information?",
        name: "usage",
        default: "<PLACEHOLDER> Instructions and examples for how to use your application.",
    },
    {
        type: "confirm",
        message: "\nQ5 of 12.\n   Do you want to allow others to contribute to your project?",
        name: "contribute",
    },
        {
        type: "confirm",
        message: "\nQ5 cont.\n   Are you using the Contributor Covenant as the guideline for users to contribute?",
        name: "contribute_covenant",
        when: ( answers ) => answers.contribute === true,
    },
    {
        name: "contribute_custom_guideline",
        message: "\nQ5 cont.\n   Please provide link or particulars for others to contribute to your project?",
        default: "<PLACEHOLDER> How others can contribute to your application or package.",
        when: ( answers ) => answers.contribute_covenant === false,
    },
    {
        message: "\nQ6 of 12.\n   References or credits?",
        name: "credits",
        default: "\n\t<PLACEHOLDER>\n\tIf crediting collaborators, include links to their GitHub profiles.\n\t" +
                "For 3rd party assets, include links to their primary web presence.\n\t" +
                "For tutorials followed, provide the URL's for the tutorial.",
    },
    {
        message: "\nQ7 of 12.\n   Tests completed for the app?",
        name: "tests",
        default: "<PLACEHOLDER> Provide examples on how to run any tests you've written for your application here.",
    },
    {
        message: "\nQ8 of 12.\n   GitHub username? (...not the whole URL, your username only)",
        name: "username",
        default: "<PLACEHOLDER> GitHub username",
        validate: function (answer) {
            if ( answer.length < 1 || answer.indexOf( "github.com" ) >= 0 ) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
            }
    },
    {
        message: "\nQ9 of 12.\n   GitHub repository name?",
        name: "repo",
        default: "<PLACEHOLDER> GitHub repository name.",
        validate: function ( answer ) {
            if ( answer.length < 1 ) {
                return console.log( "A valid GitHub repo is required for a badge." );
            }
            return true;
            }
    },
    {
        message: "\nQ10 of 12.\n   Your email address for questions?",
        name: "email",
        default: "<PLACEHOLDER> Your contact email: name@place.com",
        validate: function ( answer ) {
            if  (answer.length < 1 || answer.indexOf( "@" ) === -1 ) {
                return console.log( "A valid email is required." );
            }
            return true;
            }
    },
    {
        type: "rawlist",
        message: "\nQ11 of 12.\n   Select a license for your project.\n   If unsure, go here for help: \x1b[4mhttps://choosealicense.com/\x1b[0m",
        name: "license",
        default: "No thanks.",
        pageSize: 30,
        choices: [
        new inquirer.Separator("\n\x1b[47m\x1b[30m\x1b[1m = No license for this project ===========  \x1b[0m"),"No thanks.",
        new inquirer.Separator("\n\x1b[47m\x1b[30m\x1b[1m = Apache, MIT, Mozilla ==================  \x1b[0m"),"Apache License 2.0", "MIT License", "Mozilla Public License 2.0", 
        new inquirer.Separator("\n\x1b[47m\x1b[30m\x1b[1m = BSD ===================================  \x1b[0m"), "BSD 2-clause \"simplified\" license", "BSD 3-clause \"new\" or \"revised\" license", 
        new inquirer.Separator("\n\x1b[47m\x1b[30m\x1b[1m = GNU ===================================  \x1b[0m"), "GNU General Public License v3.0", "GNU Affero General Public License v3.0", "GNU General Public License v2.0", "GNU Lesser General Public License v2.1", 
        new inquirer.Separator("\n\x1b[47m\x1b[30m\x1b[1m = Other =================================  \x1b[0m"), "Boost Software License 1.0", "Creative Commons Zero v1.0 Universal", "Eclipse Public License 2.0", "The Unlicense"
        ],
    },
    {
        type: "rawlist",
        message: "\nQ12 of 12.\n   Would you like a header picture?",
        name: "header",
        default: "Not needed.",
        pageSize: 20,
        choices: [
        new inquirer.Separator("\n\x1b[42m\x1b[37m\x1b[1m = No thanks ===========  \x1b[0m"),"Not needed.",
        new inquirer.Separator("\n\x1b[42m\x1b[37m\x1b[1m = Geometric============  \x1b[0m"),"blue-geometric", "orange-geometric", "green-geometric", "purple-geometric", "red-geometric", "yellow-geometric", 
        new inquirer.Separator("\n\x1b[42m\x1b[37m\x1b[1m = Nature ==============  \x1b[0m"), "lake-tide", "ocean-tide", 
        new inquirer.Separator("\n\x1b[42m\x1b[37m\x1b[1m = Coding ==============  \x1b[0m"), "matrix", "code-focused",
        ],
    }
];

// Create the README.md file
writeToFile = ( fileName, data ) => {

    fs.writeFile( fileName, data, err => {
        if (err) { 
            return console.err(err); 
        } else {
        console.log("\nSuccess!\nI've built you a README.md file.\n\n");
        }
    });
};

// Commences asking the inquirer prompts following the user's command line: node index.js in the command line.
init = () => {

console.clear(); 
console.log(banner);

    inquirer
        .prompt([
            {
                name: "wants_to_start",
                type: "confirm",
                message: "Welcome, I can build a README file for you.\n  For me to do this I need you to answer some questions, keep going?",
            },
            ])
        .then((answers) => {
            if (answers.wants_to_start) {

                console.clear(); 
                console.log(banner);

                inquirer
                    .prompt(questions)
                    .then((userResponse) => {

                        console.info("Your answers: ", userResponse);

                        const createFile = generateMarkdown( userResponse );

                        writeToFile( "your_README.md", createFile );
                        console.clear(); 
                        console.log(banner);

                    });

                } else { 
                    // thought this would be a fun / colourful play but instead now realise everyone's different 
                    // terminal choices and the prescribed colours not working how it does in my setup.
                    console.clear(); 
                    console.log(`\n
\x1b[36m▁ \x1b[31m▂ \x1b[32m▄ \x1b[33m▅ \x1b[34m▆ \x1b[35m▇ \x1b[36m█ \x1b[37mSorry \x1b[36m█ \x1b[35m▇ \x1b[34m▆ \x1b[33m▅ \x1b[32m▄ \x1b[31m▂ \x1b[36m▁\x1b[37m
\n   We couldn't help you today.
   Hope to see you again soon.\n\n`)}
            });
    };

// Function call to initialize app
init();
