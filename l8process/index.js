// => process
console.log("OS Platform : ", process.platform);
console.log("Node Version : ", process.version);
console.log("Version : ", process.versions);
console.log("Architecture : ", process.arch);
console.log("Current working directory : " , process.cwd());
console.log("Command Line arguments : ", process.argv); // array
console.log(`Process has been running for ${process.uptime()} seconds`);

console.log(process.argv); // node index.js susu 23
const argname = process.argv[2];
const argage = process.argv[3];
console.log(argname,argage);