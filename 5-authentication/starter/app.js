const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

require("dotenv").config();

const db = require("./server/models");
db.sequelize.sync({ force: true, logging: false });

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));

const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

const flash = require("connect-flash");
app.use(flash());

// Global variables - passing message through session
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

const routes = require("./server/routes");
app.use("/", routes);

app.listen(port, () =>
  console.log(`Dwolla App listening at http://localhost:${port}`)
);
