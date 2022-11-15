const userSchema = require('./UserSchema');

const getUserByUsername = async (username) => {
    try {
        const dataToReturn = await userSchema.findOne({'username':username});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const updateUserByUsername = async (username, body) => {
    try {
        const dataToReturn = await userSchema.findOneAndUpdate({'username':username}, body);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const getUserById = async (id) => {
    try {
        const dataToReturn = await userSchema.findOne({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

module.exports = { getUserByUsername, updateUserByUsername, getUserById };