const express = require("express");
const zonesController = require("../controllers/zonesController");

const router = express.Router();

//Los controlers se encargan de hacer todo el trabajo de la petición manejando los req y res.
router.get("/",zonesController.getZones);
router.get("/:zoneId",zonesController.getZoneById);
router.put("/:zoneId",zonesController.updateZoneById);



module.exports = router;