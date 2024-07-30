const express = require('express')
const router = express.Router()

const { findByEmail, createUser } = require('../models/User');

//Carrega a interface de login
router.get("/login", (req, res) => {
      const renderPage = {
        css: "../css/login.css",
      };
    res.render("login", renderPage);
})

//Realiza o login e seta administradores com a role ADMIN e usuários comuns com a role USER
router.post("/login", (req, res) => {
    const { email, password } = req.body

    if(email === process.env.ADMIN && password === process.env.PASSWORD){
        req.session.email = email;
        req.session.role = 'ADMIN';

        req.session.loggedIn = true;
    
        res.redirect('/');
        return;
    } 
    
    const user = findByEmail(email);

    if(user.password === password){
        req.session.email = email;
        req.session.role = 'USER';

        req.session.loggedIn = true;

        res.redirect('/');
        return;
    }
    
    res.render("login", {
        css: "../css/login.css",
        error: "E-mail ou senha incorretos."
    });
});

//Destrói a sessão do usuário
router.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
})

//Carrega a interface de registro
router.get('/register', (req, res) => {
    const renderPage = {
        css: "../css/login.css",
      };
    res.render("register", renderPage);
})

//Registra um usuário
router.post('/register', (req, res) => {
    const { email, password, confirmPassword } = req.body

    if(password !== confirmPassword){
        res.render("register", {
            css: "../css/login.css",
            error: "As senhas devem ser iguais."
        });

        return;
    }
    
    const user = createUser(email, password);

    if(user === null){
        res.render("register", {
            css: "../css/login.css",
            error: "Já existe um usuário com este e-mail"
        });

        return;
    }
    
    res.redirect('/login');
})

module.exports = router