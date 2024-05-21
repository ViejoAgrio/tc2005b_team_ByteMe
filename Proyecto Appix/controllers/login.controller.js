const model = require("../models/login.model.js")
const bcrypt = require('bcryptjs');

module.exports.render_login = async(req,res) =>{
    res.render("login");
}

module.exports.do_login = async(req,res) =>{
    try {
        const usuarios = await model.User.findUser(req.body.username)

        if(usuarios.length < 1){
            res.render("login",{
                error: 'El usuario no existe'
            });
            return;
        }

        const usuario = usuarios[0];
        console.log(usuario);
        //const hashedPass = await bcrypt.hash(usuario.password, 12);
        //const doMatch = await bcrypt.compare(req.body.password, hashedPass);
        const doMatch = req.body.password === usuario.password;

        if(!doMatch) {
            console.error('Contraseña incorrecta.');
            res.render("login",{
                error: "Contraseña incorrecta."
            });
            return;
        }

        // Se agrega método para obtener el permiso del usuario
        const permisos = await model.User.getPermisos(usuario.nombreUsuario);
        
        if (permisos.length == 0) {
            req.session.error = "Usuario y/o contraseña incorrectos";
            res.render("login", {
                error: "Usuario y/o contraseña incorrectos"
            });
            return;
        }

        req.session.username = usuario.username;
        req.session.isLoggedIn = true;

        // Comprueba el rol para decidir qué vista renderizar
        if (permisos[0].rol === 0) { 
            req.session.roles = "Admin";
            req.session.user = usuario;
            res.redirect('admin/admin');
        } else if (permisos[0].rol === 1) {  
            req.session.roles = "User";
            req.session.user = usuario; 
            return res.redirect('/usuarios/usuario');
        } else {
            // Manejo de casos donde el rol no es reconocido
            res.render("login", {
                error: "Rol no reconocido."
            });
        }
    } catch (error) {
        console.error('error en el proceso de login', error);
        res.render("login", {
            error: "Error interno del servidor."
        });
    } 
} 

module.exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login'); 
    })
};