const postSchema = require('./PostSchema');

const getAllPosts = async () => {
    try {
        dataToReturn = undefined;
        await postSchema.find().then((data) => dataToReturn = data);
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        console.log(error);
        throw {status:500, message: error?.message || error};
    }
    
  };

  const createNewPost = async (newPost) => {
    //chequear si ya existe.
    //console.log(JSON.stringify(newPost, null, 4));

    try {
        const postSchema1 = postSchema(newPost);
  
        await postSchema1.save().then((data) => console.log(data)).catch((error) => console.log('hubo error ' + error));
  
        return newPost;
    } catch (error) {
        console.log(error.name);
        throw {status:500, message: error?.message || error};
    }
    
  };

  const getPostById = async (id) => {
    try {
        const dataToReturn = await postSchema.findOne({'id':id});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        console.log('error');
    }
  }

  module.exports = {getAllPosts, createNewPost, getPostById};