import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;

// Register view engin, Set EJS as view engine
app.set("view engine", "ejs");

// Set views folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

// Use Morgan for logging
app.use(morgan('dev'));

// Middleware to serve files from the public folder as the website root.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb://localhost:27017`;
const db_name = 'dlt_nodejs_firstdb';
let db;

async function connectToMongoDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();

        db = client.db(db_name);

        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connectToMongoDB();

// Middleware
app.use((req, res, next) => {
    if (!db) {
        return res.status(500).send('Database connection not established');
    }

    req.db = db;
    next();
});

// --------------------------------------------------------------------------------------------------------------

// GET route
app.get('/', (req, res) => {

    const posts = [
        { id: 1, title: "Post 1", subtitle: "This is post 1", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
        { id: 2, title: "Post 2", subtitle: "This is post 2", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
        { id: 3, title: "Post 3", subtitle: "This is post 3", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate." },
    ];

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
        title: 'Create New Post',
        error: null,
        formData: {}
    });
});

app.post('/posts/create', async (req, res) => {
    try {
        const { title, subtitle, body } = req.body;
        console.log('Received form data:', req.body);

        // Validate form data
        if (!title || !subtitle || !body) {
            return res.render('create', {
                title: 'Create New Post',
                error: 'All fields are required.',
                formData: req.body
            })
        }

        // prepare post data
        const newPost = {
            title : title.trim(),
            subtitle : subtitle.trim(),
            body : body.trim(),
            createdAt: new Date(),
        };  

        const result = await db.collection('posts').insertOne(newPost);

        res.render('success', {
            title: 'Success',
            message: 'Post created successfully!',
            postId: result.insertedId ?? 'Unknown'
        });

    } catch (error) {
        console.error('Error rendering create page:', error);
        res.render('create', {
            title: 'Create New Post',
            error: `Failed to load the create page: ${error.message}`,
            formData: req.body
        });
    }
});

// 404 (note : This should be the last route)
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
});


