"use strict";

var express = require("express");

var app = express();

var path = require("path");

var port = process.env.PORT || 3000;
app.use(express["static"](__dirname + "/public"));
app.use("/build", express["static"]("./node_modules/three/build/"));
app.use("/jsm", express["static"]("./node_modules/three/examples/jsm"));
app.get("/", function (req, res) {
  response.send("Connected successfuly");
});
app.listen(port, function (error) {
  if (error) {
    console.warn("".concat(error, " occured while starting server"));
    return;
  }

  console.log("listening successfuly to the port ".concat(port));
});
//# sourceMappingURL=app.dev.js.map
