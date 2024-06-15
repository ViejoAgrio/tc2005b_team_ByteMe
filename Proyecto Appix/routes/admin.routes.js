const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller.js")
const isAuth = require('../utils/is-auth');

router.get('/admin', controller.render_admin);
//router.post('/admin', controller.render_admin);
router.get('/change-password', controller.render_change_password);
router.post('/change-password', controller.post_change_password);
router.post('/eliminar', controller.eliminar_proyecto);
router.post('/copiar', controller.copiar_proyecto);

module.exports = router;