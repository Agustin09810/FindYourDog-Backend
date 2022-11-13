const express = require("express");
const departmentsController = require("../controllers/departmentsController");

const router = express.Router();

//Los controlers se encargan de hacer todo el trabajo de la petición manejando los req y res.
router.get("/",departmentsController.getDepartments);
router.get("/:departmentId",departmentsController.getDepartmentById);



module.exports = router;