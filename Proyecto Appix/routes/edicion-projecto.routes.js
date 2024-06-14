const express = require('express');
const router = express.Router();
const controller = require("../controllers/edicion-projecto.controller.js");


router.get('/', controller.render_edicionProject);
router.post('/', controller.postNewProject); 

module.exports = router;