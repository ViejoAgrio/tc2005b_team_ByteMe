const express = require('express');
const router = express.Router();
const controller = require("../controllers/cliente-empresa.controller.js");

router.get('/', controller.render_clienteEmpresa);
router.get('/cliente-empresa', controller.get_cliente);
router.post('/add-cliente', controller.add_cliente); 
router.post('/update-cliente', controller.update_cliente); 
router.post('/delete-cliente', controller.delete_cliente); 

router.get('/cliente-empresa', controller.get_empresa);
router.post('/add-empresa', controller.add_empresa); 
router.post('/update-empresa', controller.update_empresa); 
router.post('/delete-empresa', controller.delete_empresa); 

module.exports = router;