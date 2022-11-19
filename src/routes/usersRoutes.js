const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

//router.get("/:id", usersController.getUserById);
router.get("/", usersController.getUser);
router.get("/:username", usersController.getUserByUsername);
router.put("/", usersController.updateUserByUsername);



module.exports = router;