import express from 'express'
const app = express();
const port = 3000;

app.get("/",(req,res)=>{
   res.send("Get request to home page");
});

app.post("/user",(req,res)=>{
    console.log("POST request to home page");
});

app.put("/user",(req,res)=>{
    console.log("PUT request to home page");
});

app.delete("/user",(req,res)=>{
    console.log("DELETE request to home page");
})

// Route parameter
// app.get("/user/:userid",(req,res)=>{
//     res.send(`Userid : ${req.params.userid}`);
// });

// Route multi parameter
// app.get("/user/:userid/bookes/:bookid",(req,res)=>{
//     res.send(`Userid : ${req.params.userid} BookId : ${req.params.bookid}`);
// });


// Single callback
app.get("/mycall/a",(req,res)=>{
    res.send("Hello I am A!")
});

// Multi Callback
app.get("/mycall/b",(req,res,next)=>{
   console.log("First Callbacak");
   next();
},(req,res)=>{
    res.send("Hello I am B!");
});

// Array Callback

const callback1 = (req,res,next)=>{
    console.log('callback1 is working');
    next();
}

const callback2 = (req,res,next)=>{
    console.log('callback2 is working');
    next();
}

const callback3 = (req,res,next)=>{
    console.log('callback3 is working');
    next();
}

const callback4 = (req,res,next)=>{
    console.log('callback4 is working');
    next();
}

const callback5 = (req,res)=>{
    console.log('callback5 is working');
    res.send("Call back is end");
}

app.get("/mycall/c",[callback1,callback2,callback3,callback4,callback5]);

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
})