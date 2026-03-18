const express = require("express");
const port = 8457;

const app = express();
const dbConnect = require('./config/dbConnect');
const passport = require('passport');
require("./middleware/localStrategy");
const blogRoutes = require("./routes/blog.routes");
const session = require('express-session');

dbConnect();

//middleware
app.set("view engine", 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'))
app.use("/uploads", express.static("uploads"));
app.use(express.json());

app.use(session({
    name:'web-developement',
    secret: 'demo',
    saveUninitialized:false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticate)

// routes
app.use("/", require('./routes/index.routes'));
app.use("/blog", blogRoutes);

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}`);
})