const express = require('express');
const router = express.Router();
const controller = require("../controllers/detalles.controller.js")

router.get('/detalles/:id', controller.render_detalles); // Asegúrate de usar el middleware isAuth para proteger la ruta

module.exports = router;
