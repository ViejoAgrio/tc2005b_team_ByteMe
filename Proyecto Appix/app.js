// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de inicio de sesión
app.use(loginRoutes);

// Ruta de nuevo-proyecto
app.get('/nuevo-proyecto', (req, res) => {
    res.render('nuevo-proyecto'); // Renderiza la vista nuevo-proyecto.ejs
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista index.ejs
});

// Ruta para el admin
app.get('/admin', (req, res) => {
    res.render('admin'); // Renderiza la vista usuario.ejs
});

// Ruta para el usuario
app.get('/usuario', (req, res) => {
    res.render('usuario'); // Renderiza la vista usuario.ejs
});

// Configuración del directorio de archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.ejs');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});