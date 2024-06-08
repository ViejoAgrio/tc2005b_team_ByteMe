const express = require('express');
const router = express.Router();
const controller = require("../controllers/cliente-empresa.controller.js");

router.get('/', controller.render_clienteEmpresa);
router.get('/cliente-empresa', controller.get_clienteEmpresa);
router.post('/add', controller.add_clienteEmpresa); 

module.exports = router;