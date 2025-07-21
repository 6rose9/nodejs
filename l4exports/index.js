// const getstudents = require('./student.js')
// const getstudents = require('./student')

// const getstudents = require('student.js') //error
// console.log(getstudents); //error

// -------------------------------------------------------------

// Note : before export
// const getgreeting = require("./student");
// console.log(getgreeting) //{}


// -------------------------------------------------------------

// const getstudents = require("./student")
// console.log(getstudents);
// console.log(getstudents.students);
// console.log(getstudents.ages);

const {students, ages} = require("./student")
console.log(students, ages);