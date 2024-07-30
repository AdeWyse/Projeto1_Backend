// Verifica se o usuário é um admin
const checkAdmin = (req, res, next) => {
    if (!(req.session.loggedIn === true && req.session.role === 'ADMIN')) {
        res.render("login", {
            css: "../css/login.css",
            error: "Você precisa estar logado como administrador para acessar esta página."
        });
    } else {
        next();
    }
};

module.exports = checkAdmin;