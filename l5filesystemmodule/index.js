const fs = require("fs");

// => Synchronous File Read
try {
    const data = fs.readFileSync("./assets/postone.txt",'utf8');
    console.log(data);
} catch (error) {
    console.log("Error Found : ", err);
}

console.log("This is final call 1");

// => Asynchronous File Read
fs.readFile("./assets/postone.txt",(err, data)=>{
    if(err){
        console.error("Error Found : ", err)
    }
    console.log(data); //buffer
    console.log(data.toString());
});


console.log("This is final call 2");

// fs.readFileSync(path, charcode)
// fs.readFile(path,charcode, callback(error,data))