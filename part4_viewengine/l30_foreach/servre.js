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
    res.render('index');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

// => Looping
app.get('/students', (req, res) => {
    const students = [
        { id: 1, name: "Aung Aung", age: 22, score: 65 },
        { id: 2, name: "Tun Tun", age: 25, score: 55 },
        { id: 3, name: "Su Su", age: 29, score: 95 },
        { id: 4, name: "Aye Aye", age: 23, score: 80 },
        { id: 5, name: "Thu Thu", age: 25, score: 86 },
    ];

    res.render('students', { students });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});