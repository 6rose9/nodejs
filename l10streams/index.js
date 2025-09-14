// const fs = require('fs');
const fs = require('node:fs');
const http = require('node:http');
const path = require('path');
const zlib = require("zlib");

// ext 1

const readstream1 = fs.createReadStream("./datafiles/postone.txt");

readstream1.on('data', (chuck) => {
    // console.log(chuck); // <Buffer 74 68
    // console.log("length : ", chuck.length);
    // console.log(chuck.toString());
});

readstream1.on('end', () => {
    // console.log("Stream exe1 ended");
});

readstream1.on('error', (err) => {
    // console.log("Read error ", err.message)
});

// exe 2

const readstream2 = fs.createReadStream("./datafiles/posttwo.txt");
readstream2.setEncoding('utf-8');

readstream2.on('data', (chuck) => {
    // console.log(chuck); 
    // console.log("length : ", chuck.length);
    // console.log(chuck.toString());
});

readstream2.on('end', () => {
    // console.log("Stream exe1 ended");
});

readstream2.on('error', (err) => {
    // console.log("Read error ", err.message)
});

// exe 3

const readstream3 = fs.createReadStream("./datafiles/postthree.txt", { encoding: 'utf-8' });

readstream3.on('data', (chuck) => {
    console.log(chuck);
    // console.log("length : ", chuck.length);
    // console.log(chuck.toString());
});

readstream3.on('end', () => {
    // console.log("Stream exe1 ended");
});

readstream3.on('error', (err) => {
    // console.log("Read error ", err.message)
});

// exe 4 (highwater mark)

const readstream4 = fs.createReadStream("./datafiles/article.txt", {
    encoding: 'utf-8',
    highWaterMark: 8
});

readstream4.on('data', (chuck) => {
    // console.log(chuck); 
    // console.log("length : ", chuck.length);
});

readstream4.on('end', () => {
    // console.log("Stream exe1 ended");
});

readstream4.on('error', (err) => {
    // console.log("Read error ", err.message)
});

// exe 5 Pause/ Resume in string

const readstream5 = fs.createReadStream("./datafiles/announment.txt", { encoding: 'utf-8' });
let bytes = 0;

readstream5.on('data', (chuck) => {
    // console.log("length : ", chuck.length);
    bytes += Buffer.byteLength(chuck, 'utf-8');
    // console.log("Total bytes = ", bytes);
    readstream5.pause();
    setTimeout(() => readstream5.resume(), 2000);
});

readstream5.on('end', () => {
    // console.log("Stream exe1 ended");
});

readstream5.on('error', (err) => {
    // console.log("Read error ", err.message)
});

//------------------------------------------------------------------------------------

// => pipe() / write() to a writable stream (copy a file)

// exe1

// const rs1 = fs.createReadStream("./datafiles/news.txt");
const rs1 = fs.createReadStream("./datafiles/news.txt", { encoding: 'utf-8' });
const ws1 = fs.createWriteStream("./datafiles/news-one.txt");

// rs1.pipe(ws1);
rs1.on('data', (chunk) => {
    ws1.write("\n New Chunk \n");
    ws1.write(chunk);
})

// ws1.on('finish', () => console.log("Copy Finished"));
// rs1.on('error', (err) => console.error("Read error", err));
// ws1.on('error', (err) => console.error("Write error", err));

//-----------------------------------------------------------------------

// stream a file to HTTP

const server = http.createServer((req, res) => {
    const filepath = path.join(__dirname, "datafiles/news.txt");

    const rs4 = fs.createReadStream(filepath);

    rs4.on("open", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        rs4.pipe(res);
    });

    rs4.on("error", (err) => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`Not Found : ${err.message}`);
    });
})

// server.listen(3000, () => console.log('server is woring.http://localhost:3000'));

//-----------------------------------------
//zip

const rs5 = fs.createReadStream("./datafiles/news.txt");
const ws5 = fs.createWriteStream("./datafiles/news.txt.gz");

rs5.pipe(zlib.createGzip()).pipe(ws5);

ws5.on('finish', () => console.log("File compressed successfully"));
rs5.on('error', (err) => console.log("REad error", err));
ws5.on('error', (err) => console.log("Write error", err));

//-----------------------------------------
//unzip

const rs6 = fs.createReadStream("./datafiles/news.txt.gz");
const ws6 = fs.createWriteStream("./datafiles/news.txt");

rs5.pipe(zlib.createGunzip()).pipe(ws6);

ws6.on('finish', () => console.log("File uncompressed successfully"));
rs6.on('error', (err) => console.log("REad error", err));
ws6.on('error', (err) => console.log("Write error", err));

//-----------------------------------------


