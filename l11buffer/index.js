/**
 *  Buffer
 *  
 *  What
 *  - a temporary storage area for raw binary data
 *  - like an array of bytes (numbers between 0–255) that represents raw data.
 * 
 *  Why
 *  - Node.js is designed for I/O-heavy tasks (Reading files from disk, Streaming videos, Handling TCP/HTTP network packets, Talking with binary protocols)
 */

// exe1
const buff1 = Buffer.from("Hello Bago");
// console.log("Buffer : ", buff1);
// console.log("String : ", buff1.length);
// console.log("String : ", buff1.toString());

//----------------------------------------------------------------------
// exe2
const buff2 = Buffer.from("Hello Mawlamyine","utf-8");
// console.log("Buffer : ", buff2);
// console.log("String : ", buff2.length);
// console.log("String : ", buff2.toString());

//----------------------------------------------------------------------
// exe3
const buffa = Buffer.from("Hello ");
const buffb = Buffer.from("Myanmar ");
const buffc = Buffer.from("Country! ");
const joined = Buffer.concat([buffa, buffb, buffc]);
// console.log(joined);
// console.log(joined.toString);

//----------------------------------------------------------------------
// exe4 (Buffer and Stream)
const fs = require("node:fs");
const rs4 = fs.createReadStream("./datafiles/announment.txt");

let chunks = [];

rs4.on('data',chunk => chunks.push(chunk));
rs4.on('end',()=>{
    const fulltxt = Buffer.concat(chunks).toString();
    // console.log(fulltxt); 
});

rs4.on('error',err=>console.error("Read error", err));

//----------------------------------------------------------------------
//exe 5 
//compare()
const buff5 = Buffer.from("apple");
const buff6 = Buffer.from("orange");

console.log(buff5, buff6);
const cmp = Buffer.compare(buff5, buff6);
// console.log("Compare result", cmp); // -1 , equal = 0, 1

//equals()
// console.log("Is Equal : ", Buffer.from("apple").equals(Buffer.from("orange")));

//----------------------------------------------------------------------
// exe6 : JSON serialization

const buff7 = Buffer.from("Hello Yangon");
const json = JSON.stringify(buff7);
console.log(json); // json string

const parsed = JSON.parse(json);
console.log(parsed); //object

const restoredstring = Buffer.from(parsed.data);
console.log(restoredstring);
console.log(restoredstring.toString());