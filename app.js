const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

// this method is called assigment destructuring and makes arrays for each one of those elements
const [name, github] = profileDataArgs;

// to start lets have function returning string, then in the end we will modify string into html


fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;
  console.log('Portoflio complete! check out index.html to see the output!')
});
// first argument on fs write file is file name
// second argument is data that is be9ng written (in this case we used the function generate page)
// third argument is callback fuction that will handle any errors
// if error exists, throw a message error