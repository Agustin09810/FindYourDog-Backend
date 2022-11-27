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

const getPostsByZone = async (zoneId) => {
    try {
        const dataToReturn = await postSchema.find({'lostZone':zoneId});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
};


const getPagination = (page) => {
    const limit = 10 ? +10 : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

const getPostsByZonePaginated = async (zone, page) => {
    try {
        const condition = {'lostZone': zone};
        const { limit, offset } = getPagination(page);
        let dataX;
        const dataToReturn = await postSchema.paginate(condition, { offset, limit }).
        then((data) => { dataX = data;}).catch((error) => {throw {status:500, message: error?.message || error, type:'server error'}});
        return dataX;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

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

module.exports = { getPostById, createPost, updatePostById, deletePostById, getPostsByZone, getPostsByZonePaginated };