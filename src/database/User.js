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

const loginUser = async (usernamex, passwordx, req, res) => {
    console.log(usernamex);
    const username = usernamex;
    const password = passwordx;
    if(!username || !password){
        return false;
    }
    try {
        const returnedUser = await getUserByUsername(username);
        if(returnedUser == null){
            return null;
        }else{
            if(returnedUser.password == password){
                return returnedUser;
            }else{
                return null;
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        return;
    }
}
            

module.exports = { getUserByUsername, updateUserByUsername, getUserById, loginUser };