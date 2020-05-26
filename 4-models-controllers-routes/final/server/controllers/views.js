const viewHome = (req, res) => {
    res.render("home");
}

const viewRegister = (req, res) => {
    res.render("register");
}

const viewLogin = (req, res) => {
    res.render("login");
}

module.exports = {
    viewHome,
    viewRegister,
    viewLogin,
};