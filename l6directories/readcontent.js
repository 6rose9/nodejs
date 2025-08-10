const fs = require("fs");
//------------------------------------------------------------------------ Read contents of a Directory

fs.readdir(".", (err, files) => {

    if (err) throw err;
    console.info("Directory contents : ", files); // array

    files.forEach(file => {
        console.info(file);
    })
})

fs.readdir(".", { withFileTypes: true }, (err, files) => {
    
    if (err) throw err;

    console.info("Directory contents : ", files); // array

    files.forEach(file => {
        console.info(file.name, file.isDirectory() ? "Directory" : "File");
    })
})