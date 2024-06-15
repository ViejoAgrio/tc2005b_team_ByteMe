const express = require('express');
const router = express.Router();
const controller = require("../controllers/usuarios.controller.js")
const isAuth = require('../utils/is-auth');

router.get('/usuario', controller.render_usuario);

module.exports = router;