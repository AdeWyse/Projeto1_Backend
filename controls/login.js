const express = require('express')
const router = express.Router()


router.get("/login", (req, res) => {
      const renderPage = {
        css: "../css/login.css",
      };
    res.render("login", renderPage);
})

router.post("/login", (req, res) => {
    const { email, password } = req.body

    console.log(req.body)
    console.log(process.env.PASSWORD)

    if(email === process.env.ADMIN && password === process.env.PASSWORD){
        req.session.email = email;
        req.session.role = 'ADMIN';

        req.session.loggedIn = true;
    
        res.redirect('/');
    } else {
        res.render("login", {
            css: "../css/login.css",
            error: "E-mail ou senha incorretos."
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
})


module.exports = router