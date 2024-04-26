// routes/loginRoutes.js

const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    // Renderizar el formulario de inicio de sesión
    res.render('login');
});

// Ruta para manejar el envío del formulario de inicio de sesión (POST)
router.post('/login', (req, res) => {
    // Aquí iría la lógica de autenticación
    // Por ahora, vamos a simular que el inicio de sesión siempre es exitoso
    // Redirigir al usuario a la interfaz de administrador
    res.redirect('/admin');
});

module.exports = router;
