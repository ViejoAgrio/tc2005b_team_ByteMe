const User = require('../models/usuarios.model.js');
const bcrypt = require('bcryptjs');

function asignarColorAElemento(elemento, variableCSS) {
    const color = getComputedStyle(document.documentElement).getPropertyValue(variableCSS);
    elemento.style.backgroundColor = color;
}

module.exports.render_usuario = async (req, res) => {
    try {

        const newUser = new User(1);
        const result = await newUser.save();
        console.log('Id del proyecto obtenido de la base de datos:', result);
        res.render("usuarios/usuario", {
            risk: result,
            numberP: 7
        });


        //res.status(200).send(`Id del proyecto: ${result}`);

    } catch (error) {
        console.error('Error al obtener el id_proyect de la base de datos:', error);
        res.status(500).send('Error al obtener el id_proyect de la base de datos');
    }
};

/*module.exports.render_usuario = async(req,res) =>{
    res.render("usuarios/usuario");
}*/