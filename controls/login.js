const express = require('express')
const router = express.Router()

router.post("/login", (req, res) => {
    const { username, password } = req.body

    if(username === process.env.ADMIN && password === process.env.PASSWORD){
        req.session.user = username;
        req.session.role = 'ADMIN';

        req.session.loggedIn = true;
    
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
})


module.exports = router