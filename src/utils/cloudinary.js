const { v2: cloudinary } = require("cloudinary");
require('dotenv').config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath,{
            folder: 'images',
        });
        return result;
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

const deleteImage = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw {status: 500, message: error?.message || error, type: 'server error'};
    }
}

module.exports = { uploadImage, deleteImage };
