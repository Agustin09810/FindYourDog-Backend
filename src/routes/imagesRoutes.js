const express = require('express');
const imagesController = require('../controllers/imagesController');
const router = express.Router();

router.get('/:imageId', imagesController.getImageById);
router.post('/', imagesController.uploadImage);
router.delete('/:imageId', imagesController.deleteImageById);

module.exports = router;