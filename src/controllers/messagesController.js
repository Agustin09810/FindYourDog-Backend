const messages = require('../database/Message');

const getMessageById = async (req, res) => {
    const id = req.params['messageId'];
    if(!id){
        res.send({status:"FAILED", error:"Message not found"}).status(400);
        return;
    }

    try {
        const returnedMessages = await messages.getMessageById(id);
        if(returnedMessages == null){
            res.status(404).send({status:"FAILED", error:"Messages not found"});
            return;
        }else{
            res.send(returnedMessages).status(200);
            return;
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({status:"FAILED", error: 'reading error'});

    }
    
}

const createMessage = async (req, res) => {
    if(!req.body.id || !req.body.text || !req.body.originUsername || !req.body.targetUsername){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    const date = new Date();
    let message = {id:req.body.id,targetUsername:req.body.targetUsername, text:req.body.text, date: date, originUsername:req.body.originUsername};

    try {
        const returnedMessage = await messages.createMessage(message);
        if(returnedMessage == null){
            res.status(404).send({status:"FAILED", error:"Message not found"});
            return;
        }else{
            res.send({status:"OK", messae:"Created"}).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { getMessageById, createMessage };

