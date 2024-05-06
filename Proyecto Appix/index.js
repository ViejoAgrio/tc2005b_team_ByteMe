const http    = require('http');
const express = require('express');
const path    = require('path');
const app     = express();

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res, next) => {
    res.render('login'); 
});

const rutasUsuarios = require('./routes/usuarios.routes');
app.use('/usuarios', rutasUsuarios);

const rutasAdmin = require('./routes/admin.routes');
app.use('/admin', rutasAdmin);

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);