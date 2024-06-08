const express = require('express');
const router = express.Router();
const controller = require("../controllers/cliente-empresa.controller.js");

router.get('/', controller.render_clienteEmpresa);
router.get('/cliente-empresa', controller.get_cliente);
router.post('/add-cliente', controller.add_cliente); 

router.get('/cliente-empresa', controller.get_empresa);
router.post('/add-empresa', controller.add_empresa); 

module.exports = router;