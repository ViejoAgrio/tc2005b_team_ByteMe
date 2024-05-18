const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller.js");

router.get('/admin', controller.render_admin);
router.get('/nuevo-proyecto', controller.render_nuevo_proyecto);
router.post('/nuevo-proyecto', controller.save_nuevo_proyecto); // Cambiado a POST para la ruta correcta

module.exports = router;