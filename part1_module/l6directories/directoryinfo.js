const fs = require("fs");
//------------------------------------------------------------------------ Directory Info (Statistices)

fs.stat("./newfolderone", (err, stats) => {

    if (err) throw err;

    console.log("Directory Info (Statistices) : ", stats); //obj

    console.log("Is File : ", stats.isFile());
    console.log("Is Directory : ", stats.isDirectory());
});