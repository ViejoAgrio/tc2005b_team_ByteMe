const http    = require('http');
const express = require('express');
const path    = require('path');
const app     = express();
require('./public/js/cronJob');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(function(req, res, next) {
  res.header("X-Content-Type-Options", "nosniff");
  next();
});

app.set('view engine', 'ejs'); 
app.set('views', 'views'); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

const isAuth = require('./utils/is-auth');
const isUser = require('./utils/is-user');
//const isAdmin = require('./utils/is-admin');

app.get('/', async(req, res, next) => {
    res.render('login'); 
});

const rutasUsuarios = require('./routes/usuarios.routes');
app.use('/usuarios', rutasUsuarios);

const rutasAdmin = require('./routes/admin.routes');
app.use('/admin', rutasAdmin);

const rutasDetalles = require('./routes/detalles.routes');
app.use('/detalles', rutasDetalles);

const rutasNewProject = require('./routes/new_project.routes');
app.use('/admin/nuevo-proyecto', rutasNewProject);

const rutasRiesgos = require('./routes/riesgos.routes');
app.use('/admin/riesgos', rutasRiesgos);

const rutasPendientes = require('./routes/pendientes.routes');
app.use('/admin/pendientes', rutasPendientes);

const rutasClienteEmpresa = require('./routes/cliente-empresa.routes');
app.use('/admin/cliente-empresa', rutasClienteEmpresa);

const rutasLogin = require('./routes/login.routes');
app.use('/login', rutasLogin);

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);

//app.listen(3000, '192.168.1.68', () => {
//  console.log(`Server is running on http://192.168.1.68:3000`);
//});