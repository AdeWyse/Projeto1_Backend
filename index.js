//Requires gerais
const path = require("path")
require("dotenv").config()

//Express
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

//Template
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

//Cookies
const cookieParser = require("cookie-parser")
app.use(cookieParser())

//Sessão
const session = require("express-session")
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

//Rotas
const mainRouter = require('./controls/main')
const pokemonRouter = require('./controls/pokemonController')

const loginRouter = require('./controls/login');

app.use("/", mainRouter)
app.use(loginRouter)
app.use("/pokemon", pokemonRouter);

app.listen(process.env.PORT, () => {
    console.log("Running...")
})