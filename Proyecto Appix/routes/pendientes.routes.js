const express = require('express');
const router = express.Router();
const controller = require("../controllers/pendientes.controller.js");

router.get('/', controller.render_pendientes);
router.get('/pendientes', controller.get_pendientes);
router.post('/add', controller.add_pendientes); 
router.post('/update-pendiente', controller.update_pendiente); 
router.post('/delete-pendiente', controller.delete_pendiente); 

module.exports = router;