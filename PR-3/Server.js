const express = require('express');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res,render("dashboard");
})

app.get("/widgets", (req,res)=>{
    res,render("widgets");
})

app.get("/grid", (req,res)=>{
    res,render("grid");
})

app.get("/tables", (req,res)=>{
    res,render("tables");
})

app.get("/charts", (req,res)=>{
    res,render("charts");
})

app.get("/form-basic", (req,res)=>{
    res,render("form-basic");
})

app.listen(8182, ()=>{
    console.log("Server start at http://localhost:8182");
});