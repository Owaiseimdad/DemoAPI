const { raw } = require("express");
const request = require("express");
const express = request();
const filereader = require("fs");

express.use(request.json());

let rawdata = filereader.readFileSync("countries.json");
let countries = JSON.parse(rawdata);

let courses = [{ id: 1, name: "CKH (Oracle)" }];

// let india = countries["India"];
// console.log(Object.values(india));

express.get("/", function (req, res) {
  res.send("Hello World");
});

express.get("/api/fact", function (req, res) {
  res.send(countries);
});

// reading a specific routes for an API.
express.get("/api/fact/:country/", function (req, res) {
  //res.send(req.query); // reading query parameters. Query provides additional information to the backend.
  if (Object.keys(countries).includes(req.params.country)) {
    var country = countries[req.params.country];
    res.send(Object.keys(country));
  } else {
    res.status(404).send("the given country was not found.");
  }
});

express.get("/api/fact/:country/:parameters", function (req, res) {
  //res.send(req.query); // reading query parameters. Query provides additional information to the backend.
  if (
    Object.keys(countries[req.params.country]).includes(req.params.parameters)
  ) {
    res.send(countries[req.params.country][req.params.parameters]);
  } else {
    res.status(404).send("the given parameter was not found");
  }
});

// POst request which consists of the posting something on the body part of the post request. Use postman to implement this.
express.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
express.listen(port, () => console.log(`listening to port ${port}...`));
