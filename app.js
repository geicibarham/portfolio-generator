const inquirer = require('inquirer');

// wrap inquirer inside of function so it can be called later
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      // if user confirms he wants to add something about himself then he will be prompted with the section to write
      when: ({ confirmAbout }) => confirmAbout
    }
  ]);
};

// array is passed as argument so it can be acessible on whole code
const promptProject = portfolioData => {
  //  if there is no projects array property, create one
  if (!portfolioData.projects) {
    // array that will hold the data for when user wants to add more than one project
    portfolioData.projects = [];
  }


  console.log(`
    =================
    add new project
    ==============
    `);

  return inquirer.prompt([
    {
      type: 'input',
      name: ' name',
      message: 'What is the name of your project? (Required)',
      validate:nameInput => {
        if(nameInput) {
          return true;
        } else {
          console.log('Please enter the name of your project ');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project(Required)',
      validate:descriptionInput => {
        if(descriptionInput) {
          return true;
        } else {
          console.log('Please enter the description for your project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'Jquery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Github link to your project (Required)',
      
      validate: linkInput =>{
        if (linkInput) {
          return true;
        } else {
          console.log('Link for project is required!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false

    }
  ])
    // grab data from user - wether they want to add more projects or not and use push method to add it to array
    .then(projectData => {
      portfolioData.projects.push(projectData);
      // if user wants to add more data(more projects), then this condition will be true and function promptProjectData will be called
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
    // if condition is not true, then we call the function that adds information on profile data and not ptoject 
      } else {
        return portfolioData;
      }

    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  }
    )
  // .then(projectAnswers => console.log(projectAnswers));

// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// // to start lets have function returning string, then in the end we will modify string into html
// const pageHTML = generatePage(name,github);

// fs.writeFile('index.html', generatePage, pageHTML, err => {
//   if (err) throw err;
//   console.log('Portoflio complete! check out index.html to see the output!')
// });
// // first argument on fs write file is file name
// // second argument is data that is be9ng written (in this case we used the function generate page)
// // third argument is callback fuction that will handle any errors
// // if error exists, throw a message error