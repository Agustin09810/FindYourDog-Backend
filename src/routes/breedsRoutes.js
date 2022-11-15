const express = require("express");
const breedsController = require("../controllers/breedsController");

const router = express.Router();

router.get("/",breedsController.getBreeds);
router.get("/:breedId",breedsController.getBreedById);




module.exports = router;