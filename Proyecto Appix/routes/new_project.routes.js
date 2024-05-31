const express = require('express');
const router = express.Router();
const controller = require("../controllers/newProject.controller.js");

router.get('/', controller.render_newProject);
router.get('/clients', controller.getClients);
router.get('/riesgos', controller.getRiesgos);
router.get('/planAccion', controller.getPlanAccion);
router.post('/', controller.postNewProject); 
//router.put('/', controller.putNewProject);
router.delete('/', controller.deleteNewProject);

module.exports = router;