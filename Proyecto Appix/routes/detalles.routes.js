const express = require('express');
const router = express.Router();
const controller = require("../controllers/detalles.controller.js")

router.get('/detalles', controller.render_detalles); 
//router.get('/detalles', controller.render_detalles);
router.post('/update-checkbox', controller.update_checkbox);
router.post('/eliminar', controller.eliminarProyecto);

module.exports = router;
