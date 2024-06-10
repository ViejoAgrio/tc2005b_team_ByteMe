const express = require('express');
const router = express.Router();
const controller = require("../controllers/riesgos.controller.js");

router.get('/', controller.render_riesgos);
router.get('/riesgos', controller.get_riesgos);
router.post('/add', controller.add_riesgos); 
router.post('/update-riesgo', controller.update_riesgo); 
router.post('/delete-riesgo', controller.delete_riesgo); 

module.exports = router;
