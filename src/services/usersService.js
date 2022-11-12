const User = require('../database/User');

const getUserById = async (id) =>{
    try {
        const user = await User.getUserById(id);
        console.log(user + 'xddddddddddd')
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {getUserById}