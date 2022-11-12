const e = require("express");
const postsService = require("../services/postsService");

const getAllPosts = async (req, res) => {
    // *** ADD ***

    try {
        console.log('entre all posts')
        const allPosts = await postsService.getAllPosts();
        console.log(allPosts + ' del controller');
        res.send(allPosts);
    } catch (error) {
        console.log(error);
        res.send({status:"FAILED", error:error.message || 'reading error'})
    }
    
  };

  const createNewPost = async (req, res) => {
    const {body} = req;
    if(
        !body.id || !body.postImg || !body.userId || !body.tags
    ){
        res.status(400).send({status:"FAILED", data:{error:"Missing data"}});
    }else{
        try {
            const newPost = body;
            console.log('body del post ' + newPost);
            const createdPost = await postsService.createNewPost(newPost);
            res.status(201).send(createdPost)
        } catch (error) {
            res.status(error?.status || 500).send({status:"FAILED", data:{error: error?.message || error}})
        }
        
    }

    
  }


  const getPostById = async (req, res) => {
    const postId = req.params['postId'];
    if(!postId){
        return;
    }

    try {
        const returnedPost = await postsService.getPostById(postId);
        if(returnedPost == null){
            res.status(404).send({status:"FAILED", error:"Post not found"});
        }else{
            res.send(returnedPost)
        }
    } catch (error) {
        console.log(eror);
    }
    
}

module.exports = {getAllPosts, createNewPost, getPostById};