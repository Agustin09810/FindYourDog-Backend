const e = require("express");
const zones = require("../database/Zone");
const zonesSchema = require('../database/ZoneSchema');

const getZones = async (req, res) => {
    try {
        const allZones = await zones.getAllZones();
        res.send(allZones);
    } catch (error) {
        console.log(error);
        res.send({status:"FAILED", error:error.message || 'reading error'})
    }
  }

const getZoneById = async (req, res) => {
    const zoneId = req.params['zoneId'];
    if(!zoneId){
        res.send({status:"FAILED", error:"Zone not found"}).status(400);
    }
    try {
        const returnedZone = await zones.getZoneById(zoneId);
        if(returnedZone == null){
            res.status(404).send({status:"FAILED", error:"Zone not found"});
        }else{
            res.send(returnedZone).status(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({status:"FAILED", error:error.message || 'reading error'});
    }
    
}

const updateZoneById = async (req, res) => {
    const zoneId = req.params['zoneId'];
    if(!zoneId){
        res.send({status:"FAILED", error:"Zone not found"}).status(400);
        return;
    }else if(!req.body.id || !req.body.name || !req.body.imgId || !req.body.postsIds){
        res.send({status:"FAILED", error:"some field is missing"}).status(400);
        return;
    }

    try {
        console.log(zoneId)
        
        const returnedZone = await zones.updateZoneById(zoneId, req.body);
        if(returnedZone == null){
            res.status(404).send({status:"FAILED", error:"Zone not found"});
            return;
        }else{
            res.send({status:"OK", messae:"Updated"}).status(200);
            return;
        }
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getZones, getZoneById, updateZoneById};