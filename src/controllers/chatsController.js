const chats = require("../database/Chat");
const { v4: uuidv4 } = require('uuid');

const getChatById = async (req, res) => {
    const chatId = req.params['chatId'];
    if(!chatId){
        res.send({status:"FAILED", error:"Chat not found"}).status(400);
        return;
    }

    try {
        const returnedChat = await chats.getChatById(chatId);
        if(returnedChat == null){
            res.status(404).send({status:"FAILED", error:"Chat not found"});
            return;
        }else{
            res.send(returnedChat).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});

    }
    
}

const createChat = async (req, res) => {
    if(!req.body.id || !req.body.messagesIds){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }

    try {
        req.body.id = uuidv4();
        const returnedChat = await chats.createChat(req.body);
        if(returnedChat == null){
            res.status(404).send({status:"FAILED", error:"Chat not found"});
            return;
        }else{
            res.send(returnedChat).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    
}

const updateChatById = async (req, res) => {
    const chatId = req.params['chatId'];
    if(!chatId){
        res.send({status:"FAILED", error:"Chat not found"}).status(400);
        return;
    }else if(!req.body.id || !req.body.messagesIds){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }

    try {
        const returnedChat = await chats.updateChatById(chatId, req.body);
        if(returnedChat == null){
            res.status(404).send({status:"FAILED", error:"Chat not found"});
            return;
        }else{
            res.send({status:"OK", messae:"Updated"}).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { getChatById, createChat, updateChatById };
