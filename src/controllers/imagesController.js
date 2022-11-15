const images = require('../database/Image');
const uploadImageCloudinary= require('../utils/cloudinary').uploadImage; 
const deleteImageCloudinary = require('../utils/cloudinary').deleteImage;
const fs = require('fs-extra');

const getImageById = async (req, res) => {
    const imageId = req.params['imageId'];
    if(!imageId){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
    }
    try {
        const returnedImage = await images.getImageById(imageId);
        if(returnedImage == null){
            res.status(404).send({status:"FAILED", error:"Image not found"});
        }else{
            res.send(returnedImage).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
}

const uploadImage = async (req, res) => {
    if(!req.body.url){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
        return;
    }
    
    const image = req.body.url;
    try {
        const result = await uploadImageCloudinary(image);
        console.log(result);
        const imageToUpload = {
            id: result.public_id.substring(7),
            url: result.secure_url,
        }
        const returnedImage = await images.uploadImage(imageToUpload);
        return res.send(returnedImage).status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
}

const deleteImageById = async (req, res) => {
    const imageId = req.params['imageId'];
    if(!imageId){
        res.send({status:"FAILED", error:"Bad request"}).status(400);
        return;
    }
    try{
        const returnedImage = await images.deleteImageById(imageId);
        if(returnedImage == null){
            res.status(404).send({status:"FAILED", error:"Image not found"});
        }else{
            await deleteImageCloudinary("images/" + returnedImage.id);
            console.log("images/" + returnedImage.id)
            res.send(returnedImage).status(200);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
}


module.exports = { getImageById, uploadImage, deleteImageById };