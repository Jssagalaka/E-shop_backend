const express = require("express");
const app = express();

app.use("/auth", require("../router/auth.route"));

module.exports = app;
