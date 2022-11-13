const breedSchema = require('./BreedSchema');

const getAllBreeds = async () => {
    try {
        const dataToReturn = await breedSchema.find({});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        console.log('salte aca');
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

const getBreedById = async (id) => {
    try {
        const dataToReturn = await breedSchema.findOne({'id':id});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        console.log('salte aca');
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

module.exports = { getAllBreeds, getBreedById };