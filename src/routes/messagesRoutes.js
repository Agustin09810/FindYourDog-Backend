const express = require("express");
const messagesController = require("../controllers/messagesController");

const router = express.Router();

router.get("/:messageId",messagesController.getMessageById);
router.post("/",messagesController.createMessage);

module.exports = router;