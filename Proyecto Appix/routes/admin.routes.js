const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller.js")
const isAuth = require('../utils/is-auth');

router.get('/admin', controller.render_admin);
router.post('/admin', controller.render_admin);
router.get('/nuevo-proyecto', controller.render_nuevo_proyecto);
router.get('/change-password', controller.render_change_password);
//router.post('/change-password', controller.do_change_password);

module.exports = router;