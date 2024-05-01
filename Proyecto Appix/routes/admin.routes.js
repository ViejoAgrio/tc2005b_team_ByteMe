const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller.js")
const isAuth = require('../utils/is-auth');

router.get('/admin', controller.render_admin);
router.get('/nuevo-proyecto', controller.render_nuevo_proyecto);

module.exports = router;