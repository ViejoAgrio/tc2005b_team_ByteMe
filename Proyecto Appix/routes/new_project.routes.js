const express = require('express');
const router = express.Router();
const controller = require("../controllers/newProject.controller.js");

router.get('/', controller.render_newProject);
router.get('/clientes', controller.getClientes);
router.get('/empresas', controller.getEmpresas);
router.get('/riesgos', controller.getRiesgos);
router.get('/planAccion', controller.getPlanAccion);
//router.get('/getNewActionPlan', controller.getNewActionPlan);
router.post('/', controller.postNewProject); 

module.exports = router;