const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded());

let todo = [
  { task: "Project Planning", priority: "High", status: "Done" },
  { task: "Learn Node Js", priority: "Medium", status: "Pending" }
];

app.get("/", (req, res) => {
  res.render("index", { todo });
});

app.post("/add", (req, res) => {
  todo.push({
    task: req.body.task,
    priority: req.body.priority,
    status: "Pending"
  });
  res.redirect("/");
});


app.get("/edit/:id", (req, res) => {
  res.render("update", {
    item: todo[req.params.id],
    index: req.params.id
  });
});

app.post("/update/:id", (req, res) => {
  todo[req.params.id] = {
    task: req.body.task,
    priority: req.body.priority,
    status: req.body.status
  };
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  todo.splice(req.params.id, 1);
  res.redirect("/");
});

app.listen(8001, () => {
  console.log("Server Start at http://localhost:8001");
});
