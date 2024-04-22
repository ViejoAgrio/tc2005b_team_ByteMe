// app.js

const express = require('express');
const app = express();

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Ruta de inicio de sesión
app.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista login.ejs
});

// Ruta de cambio de contraseña
app.get('/cambio-contrasena', (req, res) => {
    res.render('cambio-contrasena'); // Renderiza la vista cambio-contrasena.ejs
});

// Ruta para el administrador
app.get('/admin', (req, res) => {
    res.render('admin'); // Renderiza la vista admin.ejs
});

// Ruta para el usuario
app.get('/usuario', (req, res) => {
    res.render('usuario'); // Renderiza la vista usuario.ejs
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

