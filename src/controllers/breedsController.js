const e = require("express");
const breeds = require("../database/Breed");
const breedSchema = require('../database/BreedSchema');

const getBreeds = async (req, res) => {
    if(req.query.name){
        const name = req.query.name;
        try {
            const breedsByName = await breeds.getBreedsByName(name);
            return res.send(breedsByName).status(200);
        } catch (error) {
            console.log(error);
            return res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
        }
    }
    try {
        const allBreeds = await breeds.getAllBreeds();
        return res.send(allBreeds);
    } catch (error) {
        console.log(error);
        return res.send({status:"FAILED", error:error.message || 'reading error'})
    }
}

const getBreedById = async (req, res) => {
    const breedId = req.params['breedId'];
    if(!breedId){
        return res.send({status:"FAILED", error:"Bad Request"}).status(400);
    }
    try {
        const returnedBreed = await breeds.getBreedById(breedId);
        if(returnedBreed == null){
            return res.status(404).send({status:"FAILED", error:"Breed not found"});
        }else{
            return res.send(returnedBreed).status(200);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }    
}

module.exports = { getBreeds, getBreedById };