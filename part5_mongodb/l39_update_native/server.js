import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

// Register view engin, Set EJS as view engine
app.set("view engine", "ejs");

// Set views folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));

// Use Morgan for logging
app.use(morgan("dev"));

// Middleware to serve files from the public folder as the website root.
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb://localhost:27017`;
const db_name = "dlt_nodejs_firstdb";
let db;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    db = client.db(db_name);

    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToMongoDB();

// Middleware
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).send("Database connection not established");
  }

  req.db = db;
  next();
});

// --------------------------------------------------------------------------------------------------------------

// home
app.get("/", async (req, res) => {
  try {
    console.log("Fetching posts from MongoDB...");

    const posts = await db
      .collection("posts")
      .find({})
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    console.log(`Found ${posts.length} posts`);

    res.render("index", {
      title: "Home Page",
      posts,
      postCount: posts.length,
    });
  } catch (error) {
    console.log("Error fetching posts from MongoDB", error);
    res.status(500).render("error", {
      title: "Database Error",
      message: "Failed to load posts. Please try again later",
    });
  }
});

// about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
  });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//--------------------------------------------------------------------------------------------------------------

// post
app.get("/posts/create", (req, res) => {
  res.render("create", {
    title: "Create New Post",
    error: null,
    formData: {},
  });
});

app.post("/posts/create", async (req, res) => {
  try {
    const { title, subtitle, body } = req.body;
    console.log("Received form data:", req.body);

    // Validate form data
    if (!title || !subtitle || !body) {
      return res.render("create", {
        title: "Create New Post",
        error: "All fields are required.",
        formData: req.body,
      });
    }

    // prepare post data
    const newPost = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      body: body.trim(),
      createdAt: new Date(),
    };

    const result = await db.collection("posts").insertOne(newPost);

    res.render("success", {
      title: "Success",
      message: "Post created successfully!",
      postId: result.insertedId ?? "Unknown",
    });
  } catch (error) {
    console.error("Error rendering create page:", error);
    res.render("create", {
      title: "Create New Post",
      error: `Failed to load the create page: ${error.message}`,
      formData: req.body,
    });
  }
});

app.get("/posts/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.render("error", {
        title: "Invalid ID",
        message: `Failed to load edit page: ${error.message}`,
      });
    }

    const post = await req.db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.render("404", {
        title: "404 Not Found",
      });
    }

    res.render("edit", {
      title: "Edit Post",
      error: null,
      post,
    });
  } catch (error) {
    res.render("error", {
      title: "Server Error",
      message: `Failed to load edit page: ${error.message}`,
    });
  }
});

app.post("/posts/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, body } = req.body;
    console.log("Received form data:", req.body);

    // Validate form data
    if (!title || !subtitle || !body) {
      // reload old post to refill form
      // const post = await req.db
      //   .collection("posts")
      //   .findOne({ _id: new ObjectId(id) });

      return res.render("edit", {
        title: "Edit Post",
        error: "All fields are required.",
        post: {
          // ...post,
          _id: id,
          title,
          subtitle,
          body,
        },
      });
    }

    // prepare post data
    const updateData = {
      title: title.trim(),
      subtitle: subtitle.trim(),
      body: body.trim(),
      updatedAt: new Date(),
    };

    const result = await req.db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return res.status(404).render("404", {
        title: "404 Not Found",
      });
    }

    // redirect to home
    return res.redirect("/");
  } catch (error) {
    console.error("Error rendering edit page:", error);
    res.render("edit", {
      title: "Edit Post",
      error: `Failed to load the edit page: ${error.message}`,
      post: req.body,
    });
  }
});

//--------------------------------------------------------------------------------------------------------------

// 404 (note : This should be the last route)
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
  });
});
