const checkUser = (req, res, next) => {
    if (!(req.session.loggedIn === true && (req.session.role === 'ADMIN' || req.session.role === 'USER'))) {
        res.render("login", {
            css: "../css/login.css",
            error: "Você precisa estar logado para acessar esta página."
        });
    } else {
        next();
    }
};

module.exports = checkUser;