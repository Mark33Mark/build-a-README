/*=======================================================================
 *
 *   Javascript 
 *        - builds up the README file based on the user answers passed into
 *          this script.
 *        - This file would benefit from modulisation as the script
 *          is managing too much in one function.
 * 
 *   File created: 20 October 2021
 *   Created by:   Mark Watson
 *
 *=======================================================================*/ 


generateMarkdown = ( data )  => {
  
let buildMarkDownFile = "";

if( data.header !== "Not needed." ) {

  buildMarkDownFile = `![Mark Watson](../banners/PNG_${data.header}.png)
# ${data.title}`;

} else {

buildMarkDownFile = `\n# ${data.title}`;

}

// variable created for badges to have a GitHub logo as the badges are GitHub specific.
let usersGitHub = `${data.username}/${data.repo}?style=plastic&logo=github`;

if ( data.license !== "No thanks." ) {

  // no GitHub logo for the license.
buildMarkDownFile +=`\n
[![Licence attached to repository](https://img.shields.io/github/license/${data.username}/${data.repo}?style=plastic)](LICENSE.md)`;  
}

if (data.username) {
buildMarkDownFile += `
![GitHub top language](https://img.shields.io/github/languages/top/${usersGitHub})  ![GitHub language count](https://img.shields.io/github/languages/count/${usersGitHub})
![GitHub last commit](https://img.shields.io/github/last-commit/${usersGitHub})  ![GitHub commits in last month on main branch](https://img.shields.io/github/commit-activity/m/${usersGitHub})

`;
}

// == Table of Contents ====
let tableOfContents = `### Table of Contents
  1. [Project Description](#1-description)
  2. [Installation](#2-installation)
  3. [Usage](#3-usage)
  4. [Credits](#4-credits)
  5. [License](#5-license)
  6. [How to contribute](#6-how-to-contribute)
  7. [Tests](#7-tests)
  8. [Questions](#8-how-to-contact-me)`;

// Add Table of Contents to markdown
buildMarkDownFile += tableOfContents;

// == Project Description =====
buildMarkDownFile += `

---
### 1. Description 
${data.description}
  
---
`;

// == Installation section ====
if (data.installation !== "") {

buildMarkDownFile += `### 2. Installation
The steps required to install the project and how to get the development environment running:
* ${data.installation}

---
`;
} else {

buildMarkDownFile += `### 2. Installation
The steps required to install project and how to get the development environment running:
* There are no installation instructions provided for this project.

---
`;}

// == Usage =====
buildMarkDownFile += `### 3. Usage 
${data.usage}

---
`;

// == Credits =====
buildMarkDownFile += `### 4. Credits 
${data.credits}

---
`;

// == License ==== 
if ( data.license === "No thanks." ) {

buildMarkDownFile += `### 5. License
There is no license used for this project.

---
`;

} else {

buildMarkDownFile += `### 5. License
This project is licensed under the terms of the:  
* ${data.license}

---
`;
}

// == Contribute =====
if(data.contribute === false){
  buildMarkDownFile += `### 6. How to Contribute

Contributions to this project are currently not allowed.

---
`;

} else if (data.contribute === true && data.contribute_covenant === true) {

buildMarkDownFile += `### 6. How to Contribute 
Contributions to this project are welcomed.

Guidelines for contributing are available from: [Contributor Covenant](https://www.contributor-covenant.org/)

Please do not contribute unless you are familiar with the guidelines. 

---
`;
} else {

buildMarkDownFile += `### 6. How to Contribute
${data.contribute_custom_guideline}

---
`;
}

// == Tests =====
buildMarkDownFile += `### 7. Tests 
${data.tests}

---
`;


// markdown needs a hyphen and all lower case for it's syntax to work as a link.
let titleString = data.title;
titleString = titleString.toLowerCase().replace(/\s/g, "-");

// == Questions ====
buildMarkDownFile += `### 8. How to Contact Me 
I hope you enjoy the application.  If you have any questions or would like to connect, please do so by email:

${data.email}

or follow me at my GitHub:

[${data.username}'s GitHub](https://github.com/${data.username})

---

- [Back to the top](#${titleString})
`

return buildMarkDownFile;  

};

module.exports = generateMarkdown;


// I ended up not using the below starter code as I manage the license
// amongst all the other README items inside the above script.
//
// Returns a license badge based on which license is passed in
// If there is no license, return an empty string.
// renderLicenseBadge = license => {

// }

// Returns the license link.
// If there is no license, return an empty string.
// renderLicenseLink = license => {

// }

// Returns the license section of README
// If there is no license, return an empty string.
// renderLicenseSection = license => {

// }