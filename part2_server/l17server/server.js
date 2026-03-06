const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((request, response) => {

    console.log(request.url);
    console.log(request.method);
    console.log(request.headers);

    response.setHeader('Content-Type', 'text/html', 'charset=utf-8');

    let url;

    try {
        url = new URL(request.url, `http://${request.headers.host}`);
    } catch (error) {
        console.error("Error URL : ", error);
        response.statusCode = 400;
        response.end("Bad Request");
        return;
    }

    // console.log(url);
    // console.log(url.pathname);

    let path = "./views/";
    let statusCode = 200;

    if (request.method === "GET" && url.pathname === "/") {
        path += 'index.html';
        statusCode = 200;
    } else if (request.method === "GET" && url.pathname === "/about") {
        path += 'about.html';
        statusCode = 200;
    } else if (request.method === "GET" && url.pathname === "/about-us") {
        response.setHeader('Location', '/about');
        response.statusCode = 301;
        response.end();
        return; // important
    } else {
        path += "404.html";
        statusCode = 404;
    }

    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            response.end();
        } else {
            response.end(data);
        }
    });
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server is running port ${PORT} ...`)
});