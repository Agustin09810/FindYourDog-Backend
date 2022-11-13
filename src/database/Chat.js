const Chat = require('./ChatSchema');

const getChatById = async (id) => {
    try {
        const dataToReturn = await Chat.findOne({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const createChat = async (body) => {
    try {
        const chat = new Chat(body);
        const dataToReturn = await chat.save();
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

const updateChatById = async (id, body) => {
    try {
        const dataToReturn = await Chat.findOneAndUpdate({'id':id}, body);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

module.exports = { getChatById, createChat, updateChatById };