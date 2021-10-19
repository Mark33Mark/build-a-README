
// // Returns a license badge based on which license is passed in
// // If there is no license, return an empty string.
// renderLicenseBadge = license => {

// }

// // Returns the license link.
// // If there is no license, return an empty string.
// renderLicenseLink = license => {

// }

// // Returns the license section of README
// // If there is no license, return an empty string.
// renderLicenseSection = license => {

// }

// // Generate markdown for README
generateMarkdown = ( data )  => {

let draftMarkdown =

`# ${data.title}

![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${data.username}/${data.repo}?style=flat&logo=appveyor) 
![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${data.username}/${data.repo}?style=flat&logo=appveyor)
  
`
  
  // Generate Table of Contents conditionally based on data ( i.e. userResponse data from index.js)
  let tableOfContents = `### Table of Contents`;
    (data.description !== '')? tableOfContents += `\n1. [Project Description](#1-description)` :  console.error( "No Project Description provided." );
    tableOfContents += `\n6. [License](#6-license)`

  // Add Table of Contents to markdown
  draftMarkdown += tableOfContents;

  // Add Project Description
  draftMarkdown += `
  
  ---
  ### 1. Description 
${data.description}
  
---
`

  // Installation section
  if (data.installation !== "") {
  
    draftMarkdown += `### 3. Installation
The steps required to install project and how to get the development environment running:
* ${data.installation}

---
`} else {

draftMarkdown += `### 3. Installation
The steps required to install project and how to get the development environment running:
* There are no installation instructions provided for this project.

---
`}

// License section is required
draftMarkdown +=`### 6. License
The works in this repository are subject to:  
* ${data.license}

---
`;

  // Questions / About Developer section
  let draftDev = 
  `
  
  ### Questions?  `

  draftMarkdown += draftDev;
  return draftMarkdown;  
};

// exports the variables and functions above for other modules to use them.
module.exports = generateMarkdown;