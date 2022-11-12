const userSchema = require('./UserSchema');

const getUserById = async (id) => {
    try {
        const dataToReturn = await userSchema.findOne({'id':id});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        console.log('salte aca');
        throw {status:500, message: error?.message || error, tipo:'error de server'};
    }
        
}

module.exports = {
    getUserById
}