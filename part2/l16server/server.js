const http = require('http');
const fs = require('fs');
const port = 3001;

const server = http.createServer((req, res) => {

    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Type', 'text/html','charset=utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    let path = "./views/";

    // console.log(req.url);

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us': //redirect
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.error(err);
            res.end();
        } else {
            //res.write(data);
            //res.end();
            console.log(data.toString());
            res.end(data);
        }
    });
});

server.listen(port, 'localhost', () => {
    console.log(`Server is running ${port}`);
});