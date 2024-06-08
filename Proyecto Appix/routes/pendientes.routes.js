const express = require('express');
const router = express.Router();
const controller = require("../controllers/pendientes.controller.js");

router.get('/', controller.render_pendientes);
router.get('/pendientes', controller.get_pendientes);
router.post('/add', controller.add_pendientes); 

module.exports = router;