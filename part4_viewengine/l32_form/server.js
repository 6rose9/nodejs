import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Register view engin, Set EJS as view engine
app.set("view engine", "ejs");

// Set views folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

// GET route
app.get('/', (req, res) => {
    // res.render('index');
    // res.render('index', {
    //     'title': 'Home Page',
    // });

    const posts = [
        { id: 1, title: "Post 1", subtitle: "This is post 1", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
        { id: 2, title: "Post 2", subtitle: "This is post 2", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
        { id: 3, title: "Post 3", subtitle: "This is post 3", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
    ]

    res.render('index', {
        title: 'Home Page',
        posts
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/posts/create', (req, res) => {
    res.render('create', {
        title: 'Create Post'
    });
});

// 404 (note : This should be the last route)
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
