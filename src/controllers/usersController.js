const users = require('../database/User');

const getUserByUsername = async (req, res) => {
    const username = req.params['username'];
    if(!username){
        res.send({status:"FAILED", error:"Bad Request"}).status(400);
        return;
    }
    try {
        const returnedUser = await users.getUserByUsername(username);
        if(returnedUser == null){
            res.status(404).send({status:"FAILED", error:"User not found"});
            return;
        }else{
            res.send(returnedUser).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        return;
    }    
}

const updateUserByUsername = async (req, res) => {
    const username = req.params['username'];
    if(!username){
        res.send({status:"FAILED", error:"Bad Request"}).status(400);
        return;
    }else if(!req.body.username || !req.body.password || !req.body.contactsIds || !req.body.chatsIds || !req.body.profileImg || !req.body.postsIds || !req.body.departmentId){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    try{
        const returnedUser = await users.updateUserByUsername(username, req.body);
        if(returnedUser == null){
            res.status(404).send({status:"FAILED", error:"User not found"});
        }else{
            res.send(returnedUser).status(200);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        return;
    }
}

module.exports = { getUserByUsername, updateUserByUsername };