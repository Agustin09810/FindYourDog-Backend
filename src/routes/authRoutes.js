const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.post("/", usersController.loginUser);
router.post("/:username", usersController.createUser);
router.get("/:token", usersController.verifyMail);

module.exports = router;