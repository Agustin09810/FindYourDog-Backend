const zoneSchema = require('./ZoneSchema');

const getAllZones = async () => {
    try {
        const dataToReturn = await zoneSchema.find({});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
        
}

const getZoneById = async (id) => {
    try {
        const dataToReturn = await zoneSchema.findOne({'id':id});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

const updateZoneById = async (id, body) => {
    try {
    
        const dataToReturn = await zoneSchema.findOneAndUpdate({'id':id}, body);
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }

}

module.exports = { getAllZones, getZoneById, updateZoneById };