const users = require('../database/User');
const bcrypt = require('bcrypt');
const jsonwebToken = require('jsonwebtoken');
const fs = require('fs');

const getUserByUsername = async (req, res) => {

    const username = req.params['username'];
    console.log(username);

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

const getUser = async (req, res) => {

    const username = req.userData.sub;
    console.log(username);

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
    }else if(!req.body.username || !req.body.password || !req.body.contactsUsernames|| !req.body.chatsIds || !req.body.profileImg || !req.body.postsIds || !req.body.departmentId){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    try{
        console.log(username + "hola");
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

const getUserById = async (req, res) => {
    const id = req.params['id'];
    if(!id){
        res.send({status:"FAILED", error:"Bad Request"}).status(400);
        return;
    }
    try {
        const returnedUser = await users.getUserById(id);
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

const RSA_PRIVATE_KEY = fs.readFileSync('src/keys-1/rsa_private.pem');

const loginUser = async (req, res) => {
    if(!req.body.username || !req.body.password){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    try{
        const returnedUser = await users.loginUser(req.body.username, req, res);
        if(returnedUser == null){
            res.status(404).send({status:"FAILED", error:"Authentication failed"});
        }else{
            if(bcrypt.compareSync(req.body.password, returnedUser.password)){
                const jwtBearerToken = jsonwebToken.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 10000,
                    subject: returnedUser.username
                })
            
                res.status(200).json({
                    idToken: jwtBearerToken,
                    expiresIn: 10000
                });
            }
            else{
                res.status(401).send({status:"FAILED", error:"Authentication failed"});
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        return;
    }
}

const createUser = async (req, res) => {
    if(!req.body.username || !req.body.email || !req.body.password || !req.body.departmentId){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
    }
    try{
        const canCreate = await users.verifyUser(req.body.username, req.body.password, req.body.email, req.body.departmentId);
        if(canCreate == false){
            res.status(409).send({status:"FAILED", error:"User already exists"});
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            const returnedUser = await users.createUser(req.body.username, req.body.email, req.body.password, req.body.departmentId);
            if(returnedUser == null){
                res.status(500).send({status:"FAILED", error:"Cant create user"});
            }else{
                res.send(returnedUser).status(200);
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        return;
    }
}


module.exports = { getUserByUsername, updateUserByUsername, getUserById, loginUser, getUser, createUser };