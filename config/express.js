const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { startSession } = require("./mongoose");

const authMiddleware = require("../middlewares/auth")


function setupExpress (app) {
    app.engine("hbs", handlebars({
        extname: "hbs",
    }));
    app.set("view engine", "hbs");

    app.use("/static", express.static("public"));           //static files
    // app.use(express.static("static"));

    app.use (express.urlencoded({extended: true}));

    app.use(cookieParser());

    app.use(authMiddleware);
}


module.exports = setupExpress;