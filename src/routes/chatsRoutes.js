const express = require("express");
const chatsController = require("../controllers/chatsController");

const router = express.Router();

router.get("/:chatId",chatsController.getChatById);
router.post("/",chatsController.createChat);
router.put("/:chatId",chatsController.updateChatById);

module.exports = router;
