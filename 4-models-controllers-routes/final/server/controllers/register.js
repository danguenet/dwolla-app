const bcrypt = require("bcryptjs");

const User = require("../models").users;

const register = (req, res)  => {
    const { firstName, email, password, password2 } = req.body;
    let errors = [];
    
    if (!firstName || !email || !password || !password2) {
        errors.push({ msg: "Please enter all fields" });
    }

    if (password != password2) {
        errors.push({ msg: "Passwords do not match" });
    }

    try {
        if (password.length < 8) {
            errors.push({ msg: "Password must be at least 8 characters" });
        }
    } catch(err) {}

    if (errors.length > 0) {
        res.render("register", {
            errors,
            firstName,
            email,
            password,
            password2
        });
    } else {
        User.findOne({where: { email: email }}).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists" });
                res.render("register", {
                errors,
                firstName,
                email,
                password,
                password2
                });
            } else {
                const newUser = new User({
                    firstName,
                    email,
                    password
                });
                bcrypt.genSalt(11, (_err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                        .save()
                        .then(() => {
                            req.flash(
                            "success_msg",
                            "You are now registered and can log in"
                            );
                            res.redirect("/login");
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}
module.exports = register;