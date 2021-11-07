// Dependencies 
const express = require("express");
const apiRoutes = require("./apiroutes");

const app = express();

app.use("/notes", apiRoutes);

module.exports = app;