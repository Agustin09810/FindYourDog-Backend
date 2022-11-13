const e = require("express");
const departments = require("../database/Department");
const departmentSchema = require('../database/DepartmentSchema');

const getDepartments = async (req, res) => {
    try {
        const allDepartments = await departments.getAllDepartments();
        res.send(allDepartments);
    } catch (error) {
        console.log(error);
        res.send({status:"FAILED", error:error.message || 'reading error'})
    }
}

const getDepartmentById = async (req, res) => {
    const departmentId = req.params['departmentId'];
    if(!departmentId){
        res.send({status:"FAILED", error:"Bad Request"}).status(400);
    }
    try {
        const returnedDepartment = await departments.getDepartmentById(departmentId);
        if(returnedDepartment == null){
            res.status(404).send({status:"FAILED", error:"Department not found"});
        }else{
            res.send(returnedDepartment).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }    
}

module.exports = { getDepartments, getDepartmentById };