const express = require('express');
const router = express.Router();
const controller = require("../controllers/admin.controller.js");

router.get('/admin', controller.render_admin);

module.exports = router;