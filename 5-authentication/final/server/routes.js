const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("./config/auth");

const registerController = require("./controllers/register");
const viewsController = require("./controllers/views");
const loginController = require("./controllers/login");

router.post("/register", registerController);
router.post("/login", loginController);

// Views
router.get("/", ensureAuthenticated, viewsController.viewHome);
router.get("/register", viewsController.viewRegister);
router.get("/login", viewsController.viewLogin);

module.exports = router;