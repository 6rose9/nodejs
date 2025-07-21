// => Useful OS Methods

const os = require("os");

// User & Host Info
console.log("Home Directory : ", os.homedir());
console.log("Current user info : ", os.userInfo());
console.log("Current user info username : ", os.userInfo().username);
console.log("Current user info homedir : ", os.userInfo().homedir);
console.log("The system hostname : ", os.hostname());

// System Info
console.log("OS Platform : ", os.platform());
console.log("OS Type : ", os.type());
console.log("CPU architecture : ", os.arch());

//CPU and Memory Info
console.log("An array of CPU cores : ", os.cpus());
console.log("An array of CPU cores : ", os.cpus()[0].model);
console.log('Total System memory in bytes', os.totalmem());
console.log("Free system menmory in bytes : ", os.freemem());

// Network Info
console.log("Network Interfaces : ", os.networkInterfaces());

//System Uptime
console.log("System uptime in seconds :", os.uptime());