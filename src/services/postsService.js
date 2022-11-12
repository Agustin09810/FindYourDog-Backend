const Post = require('../database/Post');

const getAllPosts = async () => {
    try {
        console.log('entre getallpost de service')
        const allPosts = await Post.getAllPosts();
        console.log('service get ' + allPosts);
        return allPosts;
    } catch (error) {
        throw error;
    }
    
  };

  const createNewPost = async (newPost) => {
    try {
        console.log('estoy service ');
        const  createdPost = await Post.createNewPost(newPost);
        return createdPost;
    } catch (error) {
        throw error;
    }
    
  };

  const getPostById = async (id) =>{
    try {
        const post = await Post.getPostById(id);
        return post;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {getAllPosts, createNewPost, getPostById};