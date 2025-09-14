// => process
// console.log("OS Platform : ", process.platform);
// console.log("Node Version : ", process.version);
// console.log("Version : ", process.versions);
// console.log("Architecture : ", process.arch);
// console.log("Current working directory : " , process.cwd());
// console.log("Command Line arguments : ", process.argv); // array
// console.log(`Process has been running for ${process.uptime()} seconds`);

// console.log(process.argv); // node index.js susu 23
// const argname = process.argv[2];
// const argage = process.argv[3];
// console.log(argname,argage);

// => Change Wroking Directory
// console.log("Before ", process.cwd());
// process.chdir("..");

// console.log("After ", process.cwd());

// => Exit the Process
// console.log("Before Exit");
// process.exit(0); // 0 = success, 1 = error
// console.log("After Exit");

// exe 1

function todotask(){
    if(Math.random() > 0.5){
        console.log("Task Completed");
        process.exit(0);
    }else{
        console.error("Task Failed");
        process.exit(1);
    }
}

todotask();
console.log("Hello Program");