import express from 'express';
const app = express();
const port = 3000;

// home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// about route
app.get('/about', (req, res) => {
    res.send('<p>About Page</p>');
});

// contact route
app.get('/contact', (req, res) => {
    res.send('<h1> Contact Us </h1>');
});

// route with query (http://localhost:3000/student?name=zin)
app.get('/student', (req, res) => {
    const name = req.query.name || 'student';
    res.json({
        message: `Hello, ${name}`
    });
});


// route with parameter (http://localhost:3000/user/11)
app.get('/user/:id', (req, res) => {
    res.send(`<h1>user profile</h1> User ID : ${req.params.id}`);
});

app.get('/products/:pid/customers/:cid', (req, res) => {
    res.status(200).json({
        id: 1,
        pid: req.params.pid,
        cid: req.params.cid,
        item: req.query.item ?? 1
    });
})

// 404 page
app.use((req, res) => {
    res.status(404).send(`<h1> 404 - Page Not Found`);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});



