
// External Modules
const express = require("express");
// Instanced Modules
const app = express();
//configuration
const PORT = 4000;

//Routes

// home route

app.get("/", function (req,res) {
    res.render("index.ejs")
})

app.get("/new", function (req,res) {
    res.render("new.ejs")
})



//server listener
app.listen(PORT, function () { // server listener
    console.log(`Server is live and listening at ${PORT}`)
});