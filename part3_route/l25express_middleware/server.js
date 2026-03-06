import express from "express";
const app = express();
const port = 3000;

//useful for POST/PUT
app.use(express.json());

// custom middleware function
const requestLogger = (req,res,next)=>{

    console.log(`${new Date().toISOString()} - ${req.method} - ${req.path} ${req.originalURL}`);
    next();
}

app.use(requestLogger);


app.use("/admin",(req,res,next)=>{
    console.log("Admin area");
    next();
})

app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin dashboard area");
})


// Get - Retrieve all items
app.get('/api/items',(req,res)=>{
    res.json([
        {id:1,name:"Item 1"},
        {id:2,name:"Item 2"},
        {id:3,name:"Item 3"},
        {id:4,name:"Item 4"},
        {id:5,name:"Item 5"}
    ]);
});

app.get("api/items/:id",(req,res)=>{
    const item = {
        id:req.params.id,
        name:`Item ${req.params.id}`,
        price:10
    };
    res.json(item);
});

// Post - Create new item
app.post("/api/items",express.json(),(req,res)=>{
    const newItem = {
        id:Date.now(),
        name:req.body.name,
        price:req.body.price
    };

    res.status(201).json(newItem);
});


// Put - Update item
app.put("/api/items/:id",(req,res)=>{
    const updateitem = {
        id:parseInt(req.params.id),
        name:req.body.name,
        price:req.body.price
    }
    res.json(updateitem);
});


app.listen(port, () => {
    console.log("Server running on port: " + port);
});
