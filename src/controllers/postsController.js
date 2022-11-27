const posts = require('../database/Post');
const { v4: uuidv4 } = require('uuid');

const getPostById = async (req, res) => {
    const postId = req.params['postId'];
    if(!postId){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
    }

    try {
        req.body.id = uuidv4();
        const returnedPost = await posts.getPostById(postId);
        if(returnedPost == null){
            res.status(404).send({status:"FAILED", error:"Post not found"});
        }else{
            res.send(returnedPost).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});

    }
    
}

const getPostByZone = async (req, res) => {
    if(req.query.zoneId){
        const zoneId = req.query.zoneId;
        if(req.query.page){
            const page = req.query.page;
            try {
                const postsByZone = await posts.getPostsByZonePaginated(zoneId, page);
                if(postsByZone == null){
                    return res.status(404).send({status:"FAILED", error:"Posts not found"});
                }else{
                    return res.send({
                        totalItems: postsByZone.totalDocs,
                        totalPages: postsByZone.totalPages,
                        currentPage: postsByZone.page - 1,
                        posts: postsByZone.docs
                    }).status(200);
                }
            } catch (error) {
                console.log(error);
                return res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
            }
        }
        try {
            const returnedPosts = await posts.getPostsByZone(zoneId);
            if(returnedPosts == null){
                return res.status(404).send({status:"FAILED", error:"Post not found"});
            }else{
                return res.send(returnedPosts).status(200);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        }
    }else{
        res.status(400).send({status:"FAILED", error:"Bad request"});
    }
}
   

const createPost = async (req, res) => {
    if(!req.body.id || !req.body.user || !req.body.dogName || !req.body.dogGender || !req.body.dogBreed || !req.body.lostOn || !req.body.lostZone || !req.body.photos){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    try {
        req.body.id = uuidv4();
        const returnedPost = await posts.createPost(req.body);
        if(returnedPost == null){
            res.status(500).send({status:"FAILED", error:"Cant post"});
        }else{
            res.send(returnedPost).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});

    }
    
}

const updatePostById = async (req, res) => {
    const postId = req.params['postId'];
    if(!postId){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
        return;
    }else if(!req.body.id || !req.body.user || !req.body.dogName || !req.body.dogGender || !req.body.dogBreed || !req.body.lostOn || !req.body.lostZone || !req.body.photos){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }
    try{
        const returnedPost = await posts.updatePostById(postId, req.body);
        if(returnedPost == null){
            res.status(404).send({status:"FAILED", error:"Post not found"});
        }else{
            res.send(returnedPost).status(200);
        }
    }catch{
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
}

const deletePostById = async (req, res) => {
    const postId = req.params['postId'];
    if(!postId){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
        return;
    }
    try{
        const returnedPost = await posts.deletePostById(postId);
        if(returnedPost == null){
            res.status(404).send({status:"FAILED", error:"Post not found"});
        }else{
            res.send(returnedPost).status(200);
        }
    }catch{
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
}

module.exports = { getPostById, createPost, updatePostById, deletePostById, getPostByZone };






