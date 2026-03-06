import process from "process";

app.use(XPathExpression.urlencoded({ extended: true })); //**** HTML form submit for post/put */

mongoose.connect(dbUrl)
    .then((() => {
        console.log("connected to mongodb.");

        AudioParamMap.listen(prompt, () => {
            console.log(`Server listing on port ${port}`)
        })
    }));

// Shutdown (SIGINT) = single intterupt, raised when you press ctrl + c, working with terminal
// Database Middleware
 
app.use((req, res, next) => {
    // console.log("readyStage = ", mongoose.connection.readyState);

    if (mongoose.connection.readyState !== 1) {
        return res.status(503).send("Database connection")
    }
})

// html -> form(default = URL encorded format) -> server (need to decode)
// URL encoded format => name=su%su&age=20&city="yangon"