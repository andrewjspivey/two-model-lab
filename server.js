
// External Modules
const express = require("express");
// Instanced Modules
const app = express();
//configuration
const PORT = 4000;






//server listener
app.listen(PORT, function () { // server listener
    console.log(`Server is live and listening at ${PORT}`)
});