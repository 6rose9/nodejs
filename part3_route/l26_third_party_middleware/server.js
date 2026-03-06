import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = 3000;

/** 
 * Thirdparty middlewares 
 */
// for logger on console 
app.use(morgan('combined')); // (dev, combined, short, tiny)

// method 1 - open to all origins 
app.use(cors()); // (should use only for development only)

// method 2
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));

// method 3
const whitelist = ["http://localhost:8000", "http://frontend.com", "http://companyproject.or"]
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // for thirdparty app (such as postman, curl)
        if (whitelist.indexOf(origin) !== -1) return callback(null, true)
        callback(new Error(`Not allowed by CORS`));
    },
    credentials: true
}

app.use(cors(corsOptions));


/**
 * Built in middleware
 */

app.use(express.json());

app.get('/', (req, res) => {
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

