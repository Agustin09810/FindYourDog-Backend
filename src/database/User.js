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
        console.log(username + "hola2");
        const dataToReturn = await userSchema.findOneAndUpdate({'username':username}, body);
        console.log(dataToReturn + "adios");
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

const loginUser = async (usernamex, req, res) => {
    const username = usernamex;
    if(!username){
        return false;
    }
    try {
        const returnedUser = await getUserByUsername(username);
        if(returnedUser == null){
            return null;
        }else{
            return returnedUser
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'server error'});
        return;
    }
}

const verifyUser = async (usernamex, passwordx, emailx, departmentx, req, res) => {
    const username = usernamex;
    const password = passwordx;
    const department = departmentx;
    const email = emailx;
    if(!username || !password || !email || !department){
        return false;
    }
    try {
        const dataToReturn1 = await userSchema.findOne({'username':username});
        const dataToReturn2 = await userSchema.findOne({'email':email});
        if(dataToReturn1 == null && dataToReturn2 == null){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'server error'});
        return;
    }
}

const createUser = async (username, email, password, departmentId) => {
    try {
        const user = new userSchema(
            {
                username: username,
                email: email,
                password: password,
                departmentId: departmentId,
                contactsUsernames: [],
                chatsIds: [],
                profileImg: "defaultImage",
                postsIds: [],
            }
        );
        const dataToReturn = await user.save().then((data) => { return data;}).catch((error) => {throw {status:500, message: error?.message || error, type:'server error'}});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}  

            





            

module.exports = { getUserByUsername, updateUserByUsername, getUserById, loginUser, verifyUser, createUser };