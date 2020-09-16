
// External Modules
const express = require("express");
const methodOverride = require('method-override');
// Instanced Modules
const app = express();
//configuration
const PORT = 4000;
// Internal Modules
const db = require("./models");
const restaurantsController = require("./controllers/restaurant.js")



app.set("view engine", "ejs");


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

//Routes

// home route



app.use("/restaurants", restaurantsController)






//server listener
app.listen(PORT, function () { // server listener
    console.log(`Server is live and listening at ${PORT}`)
});