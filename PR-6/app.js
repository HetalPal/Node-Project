    const express = require('express');
    const port = 8712;
    const app = express();
    const dbConnect = require('./config/dbConnect');
    const cookieParser = require('cookie-parser');

    dbConnect();

    app.set("view engine", "ejs");

    app.use(cookieParser());
    app.use(express.urlencoded());
    app.use(express.static("public"));
    app.use("/uploads", express.static("uploads"));

    
    app.use("/", require("./routes/index.routes"));
    app.use("/admin", require("./routes/admin.routes"));

    app.listen(port, () => {
        console.log(`Server start at http://localhost:${port}`);
    });