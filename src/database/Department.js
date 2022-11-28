const departmentSchema = require('./DepartmentSchema');

const getAllDepartments = async () => {
    try {
        const dataToReturn = await departmentSchema.find({});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

const getDepartmentById = async (id) => {
    try {
        const dataToReturn = await departmentSchema.findOne({'id':id});
        console.log(dataToReturn);
        return dataToReturn;
    } catch (error) {
        throw {status:500, message: error?.message || error, type:'server error'};
    }
}

module.exports = { getAllDepartments, getDepartmentById };