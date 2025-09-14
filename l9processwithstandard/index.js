// => Process with Standard Input / Output / Error

// process.stdin(standard input)
// process.stdout(standard out)
// process.stderr(standard error)

// => ---------------------------------------- stdout
// process.stdout.write("Hello ");
// process.stdout.write("Mandalay");
// process.stdout.write("\n");

// => ---------------------------------------- Get Terminal Size
// console.log("Terminal Width : ", process.stdout.columns);
// console.log("Terminal Height : ", process.stdout.rows);

// => ---------------------------------------- clearLine(0), cursorTo(0)

// exe 1 (progress bar)
let progress = 0;

// const proginvl = setInterval(() => {

//     process.stdout.clearLine(0);
//     process.stdout.cursorTo(0);
//     process.stdout.write(`Progress : ${progress}%`);

//     progress += 10;

//     if (progress > 100) {
//         clearInterval(proginvl);
//     }
// }, 300);

// console.log("I am printing ...");

// => ---------------------------------------- process.stdin

// on vs once
// once() it better for we only expect one input
// on() for mor input
// console.log("Enter your name and press Enter");

// process.stdin.setEncoding("utf8");
// process.stdin.on("data", (data) => {
//     const getname = data.toString().trim();
//     console.log(`Your name is ${getname}`);
//     process.exit(0);
// });

// process.stdin.once("data", (data) => {
//     const getanser = data.toString().trim().toLowerCase();
//     if(getanser == "yes"){
//         console.log("Awesome!");
//     }else{
//         console.log("May be you'll like it later.")
//     }

//     process.exit();
// });

// console.log("I am working...");

// => ---------------------------------------- process.stderr

// process.stderr.write("Error, Something went worng \n");
process.stderr.write("Error , Cannot connect to databae \n");
process.exit(1);
console.log("I am doning");

//11SD
