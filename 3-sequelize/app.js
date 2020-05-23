const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

require("dotenv").config();

const db = require("./server/models");
db.sequelize.sync();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () =>
  console.log(`Dwolla App listening at http://localhost:${port}`)
);
