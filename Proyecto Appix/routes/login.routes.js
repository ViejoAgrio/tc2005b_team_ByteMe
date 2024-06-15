const express = require('express');
const router = express.Router();
const controller = require("../controllers/login.controller.js")
const isAuth = require('../utils/is-auth');

router.get('/', controller.render_login);
router.post('/', controller.do_login);
router.get('/logout', controller.get_logout);

module.exports = router;