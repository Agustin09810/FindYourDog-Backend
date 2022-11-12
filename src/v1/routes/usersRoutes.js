const express = require("express");
const usersController = require("../../controllers/usersController");

const router = express.Router();

//Los controlers se encargan de hacer todo el trabajo de la petición manejando los req y res.
router.get("/:userId", usersController.getUserById);



module.exports = router;