"use strict";

const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 9000;

app.use(express.static(__dirname + "/public"));

app.use("/build/", express.static(path.join(__dirname, "node_modules/three/build")));
app.use("/jsm/", express.static(path.join(__dirname, "node_modules/three/examples/jsm")));

app.get("/", (req, res) => {
  response.send("Connected successfuly");
});

app.listen(port, (error) => {
  if (error) {
    console.warn(`${error} occured while starting server`);
    return;
  }
  console.log(`listening successfuly to the port ${port}`);
});
