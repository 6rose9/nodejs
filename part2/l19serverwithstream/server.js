// => without streaming

const http = require('http');
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'paragraphs.txt');

const PORT = 3500;

const server = http.createServer((req, res) => {

    if (req.url === '/file') {
        fs.stat(filepath, (err, stats) => {

            if (err) return res.writeHead(404).end('File not found!'); // important to return

            res.writeHead(200, {
                'content-type': 'text/plain;charset=utf-8',
                'content-length': stats.size
            });

            const stream = fs.createReadStream(filepath);
            stream.pipe(res);
        });
    } else {
        res.writeHead(200).end(`Go to: http://localhost:${PORT}/file`);
    }
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}`)
});