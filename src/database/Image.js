const imageSchema = require ('./ImageSchema');

const getImageById = async (id) => {
    try {
        const dataToReturn = await imageSchema.findOne ({'id': id});
        console.log (dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

const uploadImage = async (body) => {
    try {
        const image = new imageSchema (body);
        const dataToReturn = await image.save().then((data) => { return data;}).catch((error) => {throw {status: 500, message: error?.message || error, type: 'server error'}});
        return dataToReturn;
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

const deleteImageById = async (id) => {
    try {
        const dataToReturn = await imageSchema.findOneAndDelete({'id':id});
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}
        

module.exports = { getImageById, uploadImage ,deleteImageById };