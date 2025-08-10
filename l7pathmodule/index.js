// console.log("Directory Global Variables : ", __dirname);

// => Path Module
const pathModule = require("path")

// => -------------------------------------Get directory name form a file path, dirname()
const filepath = "./home/zzt/Documents/learning/nodejsbatch1/l7pathmodule/index.js";
const dirname = pathModule.dirname(filepath);
// console.log("Directory : ", dirname);

// => -------------------------------------Get file name form a file path, basename()
const fileurl = "./home/zzt/Documents/learning/nodejsbatch1/l7pathmodule/index.js";
const filename = pathModule.basename(fileurl);
// console.log("Filename : ", filename);

// => -------------------------------------Get file name without extension from a file path, basename()
const filelink = "./home/zzt/Documents/learning/nodejsbatch1/l7pathmodule/index.js";
const filenamewithoutext = pathModule.basename(filelink,".js");
// console.log("Filename without extension : ", filenamewithoutext);

// => -------------------------------------Get file extension from a file path, basename()
const fileroute = "./home/zzt/Documents/learning/nodejsbatch1/l7pathmodule/index.js";
const getextension = pathModule.basename(fileroute,".js");
// console.log("Filename extension : ", getextension);

// => ------------------------------------- separator & delimiter
// console.log("Separator : ", pathModule.sep); // /
// console.log("Delimiter : ", pathModule.delimiter); // :

// => -------------------------------------split()

const url = "./home/zzt/Documents/learning/nodejsbathch1/l7pathmodule/index.js";
const segments = url.split(pathModule.sep);
// console.log(segments);

// => -------------------------------------parse()
const rootUrl = "/home/zzt/Documents/learning/nodejsbathch1/l7pathmodule/index.js";
const parsed = pathModule.parse(rootUrl);
// console.log(parsed);
// console.log(parsed.root);

// => -------------------------------------format()
const formatted = pathModule.format({
    dir: "/users/projects",
    base: "appljs"
});

// console.log(formatted);

// => -------------------------------------join()
const fullpath = pathModule.join("folder1", "folder2", "folder3", "projects", "app.js");
// console.log(fullpath);

// => -------------------------------------resolve()
const resolvepath = pathModule.resolve("projects", "libs", "js", "app.js");
// console.log(resolvepath);

// => -------------------------------------normalize()
const messypaht = "/users//app/../app/project//app.js";
// console.log(pathModule.normalize(messypaht));

// => -------------------------------------relative(from,to)
const from = "/users/app/project";
const to = "/users/app/assets/image";
// console.log(pathModule.relative(from, to)); // ../assets/image

// => -------------------------------------encodeURIcomponent()
function encodeurl(filepath) {
    const arrpaths = filepath.split(pathModule.sep);
    return arrpaths.map(arrpath => encodeURIComponent(arrpath)).join("/");
}

const pathone = pathModule.join("assets", "my project", "new app.js");
// console.log(pathone);
// console.log(encodeurl(pathone)); //assets/my%20project/new%20app.js

// => -------------------------------------decodeURIComponent()
function decodeurl(filepath) {
    const arrpaths = filepath.split("/");
    return arrpaths.map(arrpath => decodeURIComponent(arrpath)).join(pathModule.sep);
}

const pathtwo = "assets/my%20project/new%20app.js";
// console.log(decodeurl(pathtwo)); //assets/my project/new app.js

//----------------------------------------------------------------------------Exercise

// create folder with fs module including path module

const path = require("path");
const fs = require("fs");

const dirpath = path.join(__dirname,"projectfolder");

if(!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath);
    // console.log("Create Folder Successfully" , dirpath);
}

//------------------------------------------------------------------------------Notes

// .dirname(absolute file path)
// .basename(absolute file path)
// .basename(absolute file path, "file extension")
// .extname(absolute file path)


