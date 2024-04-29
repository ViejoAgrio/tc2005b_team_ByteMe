// routes/loginRoutes.js

const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.render('admin');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/usuario', (req, res) => {
    res.render('usuario');
});

router.get('/nuevo-proyecto', (req, res) => {
    res.render('nuevo-proyecto');
});

router.get('/detalles', (req, res) => {
    res.render('detalles');
});


module.exports = router;
