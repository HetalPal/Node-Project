const express = require("express");
const app = express();

app.use(express.static("public"));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.get("/widgets", (req, res) => {
  res.render("widgets");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/tables", (req, res) => {
  res.render("tables");
});

app.get("/chart", (req, res) => {
  res.render("chart");
});

app.get("/basic-form", (req, res) => {
  res.render("basic-form");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
