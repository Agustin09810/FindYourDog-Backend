const postSchema = require('./PostSchema');

const getPostById = async (id) => {
    console.log(id);
    try {
        const dataToReturn = await postSchema.findOne({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const createPost = async (body) => {
    try {
        const post = new postSchema(body);
        const dataToReturn = await post.save().then((data) => { return data;}).catch((error) => {throw {status:500, message: error?.message || error, type:'server error'}});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

const updatePostById = async (id, body) => {
    try {
        const dataToReturn = await postSchema.findOneAndUpdate({'id':id}, body);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

const deletePostById = async (id) => {
    try {
        const dataToReturn = await postSchema.findOneAndDelete({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};

module.exports = { getPostById, createPost, updatePostById, deletePostById };