const e = require("express");
const breeds = require("../database/Breed");
const breedSchema = require('../database/BreedSchema');

const getBreeds = async (req, res) => {
    try {
        const allBreeds = await breeds.getAllBreeds();
        res.send(allBreeds);
    } catch (error) {
        console.log(error);
        res.send({status:"FAILED", error:error.message || 'reading error'})
    }
}

const getBreedById = async (req, res) => {
    const breedId = req.params['breedId'];
    if(!breedId){
        res.send({status:"FAILED", error:"Bad Request"}).status(400);
    }
    try {
        const returnedBreed = await breeds.getBreedById(breedId);
        if(returnedBreed == null){
            res.status(404).send({status:"FAILED", error:"Breed not found"});
        }else{
            res.send(returnedBreed).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }    
}

module.exports = { getBreeds, getBreedById };