const fs = require("fs");

//------------------------------------------------------------------------- CHECK FILE EXISTS

// => Synchronous
try {
    fs.accessSync("assets/postone.txt", fs.constants.F_OK);
    console.log("File exists by sync");
} catch (error) {
    console.log("File donen't exit");
}

// => Asynchronous
fs.access("/.assets/postone.txt", fs.constants.F_OK, (error) => {
    if (error) {
        console.log("File does not exist by async");
        return;
    }
    console.log("File exists by async");
});

//------------------------------------------------------------------------- READ FILE

// => Synchronous File Read
try {
    const data = fs.readFileSync("./assets/postone.txt", 'utf8');
    console.log(data);
} catch (error) {
    console.log("Error Found : ", error);
}

console.log("Finish readFileSync");

// => Asynchronous File Read
fs.readFile("./assets/postone.txt", (err, data) => {
    if (err) {
        console.error("Error Found : ", err)
    }
    console.log(data); //buffer
    console.log(data.toString());
});

console.log("Finish readFile by asc");

//------------------------------------------------------------------------- File Info (File Statistics)

fs.stat("./assets/postone.txt", (err, stats) => {
    if (err) {
        console.log("Error stats ,", err)
        return;
    }
    // console.log(stats);

    console.log("File Stats", {
        filesize: stats.size + "bytes",
        createdAt: stats.birthtimeMs,
        updatedAt: stats.mtime,
        isfile: stats.isFile(),
        isdirectory: stats.isDirectory(),
    })
});

//------------------------------------------------------------------------- Write File

// => Synchronous
const content = "This is new article written by sync";
try {
    fs.writeFileSync("./datafiles/articleone.txt", content);
    console.log("File created and written successfully.");
} catch (error) {
    console.log(error);
}
// => Asynchronous
fs.writeFile('./datafiles/articletwo.txt', content, () => {
    console.log("File created and written successfully by asyc");
});

//------------------------------------------------------------------------- Append File

const newcontent = "\nAppended content text.";

// => Synchronous

try {
    fs.appendFileSync("./datafiles/articleone.txt", newcontent);
    console.log("Content appended successfully.");
} catch (error) {
    console.log("Error appending file.", error);
}

// => Asynchronous

fs.appendFile("./datafiles/articletwo.txt", newcontent, (err) => {
    if (err) {
        console.error("Error appending : ", err);
        return;
    }
    console.log("Content appended successfully");
})

//------------------------------------------------------------------------- File Rename

// => Synchronous

try {
    fs.renameSync("./datafiles/articleone.txt", "./datafiles/articleOne.txt");
    console.log("File renamed successfully.");
} catch (error) {
    console.error("Error renaming file.", error);
}

// => Asynchronous

fs.rename("./datafiles/articletwo.txt", "./datafiles/articleTwo.txt", (err) => {
    if (err) {
        console.error("Error renaming file", err);
        return;
    }
    console.log("File renamed successfully by async");
});

//------------------------------------------------------------------------- Delete File

// => Synchronous

try {
    if (fs.existsSync("./datafiles/articleOne.txt")) {
        fs.unlinkSync("./datafiles/articleOne.txt");
        console.log("File deleted successfully.");
    }
} catch (error) {
    console.error("Error deleting file", error);
}

// => Asynchronous

fs.unlink("./datafiles/articleTwo.txt", (err) => {
    if (err.code === "ENOENT") {
        console.log("File does not exists.");
    } else {
        console.log("Error deleting file", err);
    }
    console.log("File deleted successfully by async");
});












//------------------------------------------------------------------------- Note
// fs.accessSync(path, fs.constants.F_Ok)
// fs.access(path,fs.constants.F_Ok,callback)
// fs.constants.F_OK = Cross-Platform consistency.

// fs.readFileSync(path, charcode)
// fs.readFile(path,charcode, callback(error,data))

// fs.stat(path, callback)

// fs.writeFileSync(path,content);
// fs.writeFile(path, content, callback);

// fs.appendFileSync(path,newcontent)
// fs.appendFile(path,newcontent,callback)

// fs.renameSync(path,newcontent)
// fs.rename(path,newcontent,callback)