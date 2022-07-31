const request = require("express");
const express = request();
express.get("/", function (req, res) {
  res.send("Hello World");
});

express.get("/api/compares", function (req, res) {
  res.send([1, 2, 3, 45, 2]);
});
express.listen(3000, () => console.log("listening to port 3000..."));
