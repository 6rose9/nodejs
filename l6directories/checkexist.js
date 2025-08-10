const fs = require("fs");
//------------------------------------------------------------------------ Check File Exists

if (fs.existsSync("index.js")) {
    console.log("index file exists by sync");
} else {
    console.log("index file does not exists by sync");
}

//------------------------------------------------------------------------ Check Directory Exists

if (fs.existsSync("newfolderone")) {
    console.log("newfolderone exists by sync");
} else {
    console.log("newfolderone does not exists by sync");
}