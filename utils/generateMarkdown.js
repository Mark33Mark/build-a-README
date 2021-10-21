


generateMarkdown = ( data )  => {
  
let buildMarkDownFile = "";

if( data.header !== "Not needed." ) {

  buildMarkDownFile = `![Mark Watson](./banners/PNG_${data.header}.png)
# ${data.title}`;

} else {

buildMarkDownFile = `\n# ${data.title}`;

}

let usersGitHub = `${data.username}/${data.repo}?style=plastic&logo=github`;

if ( data.license !== "No thanks." ) {
buildMarkDownFile +=`\n
[![Licence attached to repository](https://img.shields.io/github/license/${usersGitHub})](LICENSE.md)`;
}

if (data.username) {
buildMarkDownFile += `
![GitHub top language](https://img.shields.io/github/languages/top/${usersGitHub})  ![GitHub language count](https://img.shields.io/github/languages/count${usersGitHub})
![GitHub last commit](https://img.shields.io/github/last-commit/${usersGitHub})  ![GitHub commits in last month on main branch](https://img.shields.io/github/commit-activity/m/${usersGitHub})

`;
}

// == Table of Contents ====
let tableOfContents = `### Table of Contents
  1. [Project Description](#1-description)
  2.
  3.
  4.
  5.
  6. [License](#6-license)`;

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
buildMarkDownFile += `### 3. Description 
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

// == Questions ====

buildMarkDownFile += `### Questions / Contact Me 
I hope you enjoy the application.  If you have questions or want to connect then please do so by

`

return buildMarkDownFile;  

};

module.exports = generateMarkdown;


// Decided not to use this starter code.  Instead I've passed the
// user repsonse as 

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