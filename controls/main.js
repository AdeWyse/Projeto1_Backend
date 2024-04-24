const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    let error = ""
    if (req.session.messages != undefined) {
        error = req.session.messages.pop()
    }
    res.render("index")
})



module.exports = router