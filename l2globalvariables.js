// Global Variable 

console.log("Dir Name = " , __dirname);

console.log("File Name =", __filename);

const fullname = "Aung Ko Ko"; // module level variable
console.log(fullname);

globalThis.nickname = "Aung Aung";
console.log(nickname);

//=> process
console.log("Node Version : ", process.version)
console.log("OS Platform", process.platform)