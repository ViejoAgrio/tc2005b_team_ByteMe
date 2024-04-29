// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./routes/Routes');

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Usar las rutas de inicio de sesión
app.use(Routes);

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('login'); // Renderiza la vista index.ejs
});

// Configuración del directorio de archivos estáticos
app.use(express.static('public'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});