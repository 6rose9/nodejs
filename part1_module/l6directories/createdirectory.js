const fs = require("fs");
//------------------------------------------------------------------------ Create Directory

//  => Synchronous
try {
    // fs.mkdirSync("./newfolderone");
    fs.mkdirSync("./newfolderone/test/folder1", { recursive: true });
    console.log("Directory created successfully by sync");
} catch (error) {
    console.error("Error creating directory by sync.")
}

// => Asynchronous
fs.mkdir("./newfoldertwo", { recursive: true }, (err) => {
    if (err) {
        console.error("Error creating directory : ", err);
        return;
    }

    //if (err) throw err;

    console.log("Directory created successfully");

})