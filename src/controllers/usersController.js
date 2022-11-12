const e = require("express");
const usersService = require("../services/usersService");

const getUserById = async (req, res) => {
    const userId = req.params['userId'];
    if(!userId){
        return;
    }

    try {
        const returnedUser = await usersService.getUserById(userId);
        if(returnedUser == null){
            res.status(404).send({status:"FAILED", error:"User not found"});
        }else{
            res.send(returnedUser)
        }
    } catch (error) {
        console.log(eror);
    }
    
}

module.exports = {getUserById};