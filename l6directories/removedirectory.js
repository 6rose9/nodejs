const fs = require("fs");
//------------------------------------------------------------------------ Remove Directory

// => Synchronous
try {
    // fs.rmSync("./assets", { recursive: true });
    fs.rmSync("./assets", { recursive: true, force: true })
    console.log("Directory removed by sync");
} catch (error) {
    console.error("Error removing directory by sync");
}

// => Asynchronous
fs.rm("./libs", { recursive: true, force: true }, (error) => {
    if (error) throw error;
    console.log("Directory removed by asyn");
});
