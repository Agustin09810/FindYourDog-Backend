const MessageSchema = require('./MessageSchema');

const getMessageById = async (id) => {
    try {
        const dataToReturn = await MessageSchema.findOne({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const createMessage = async (body) => {
    try {
        const message = new MessageSchema(body);
        const dataToReturn = await message.save().then((data) => { return data;}).catch((error) => {console.log('xdddd'); throw {status:500, message: error?.message || error, type:'server error'}});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

module.exports = { getMessageById, createMessage };


