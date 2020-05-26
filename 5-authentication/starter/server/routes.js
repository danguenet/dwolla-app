const express = require("express");
const router = express.Router();

const registerController = require("./controllers/register");
const viewsController = require("./controllers/views");

// Register
router.post("/register", registerController);

// Views
router.get("/", viewsController.viewHome);
router.get("/register", viewsController.viewRegister);
router.get("/login", viewsController.viewLogin);

module.exports = router;