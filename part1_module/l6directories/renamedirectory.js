const fs = require("fs");
//------------------------------------------------------------------------ Rename Directory
// create first (main, data) folders

//=> Synchronous
try {
    fs.renameSync("./main", "./assets");
    console.log("Directory renamed successfully by sync");
} catch (error) {
    console.error("Error creating directory by sync.")
}
//=> Asynchronous
fs.rename("./data", "./libs", (err) => {
    if (err) throw err;
    console.log("Directory renamed successfully");
})