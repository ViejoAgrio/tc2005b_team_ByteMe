const User = require("../models/usuarios.model.js");
const model = require("../models/usuarios.model.js")
const bcrypt = require('bcryptjs');

/*module.exports.render_usuario = async (req, res) => {
    try {
        const newUser = new User(); // Crear una instancia de User (puedes pasar un id_proyect si lo deseas)

        const result = await newUser.save(); // Ejecutar el método save() para realizar la consulta
        const primer_idProyecto_pk = result[0].primer_idProyecto_pk; // Obtener el resultado de la consulta

        console.log('Id del proyecto obtenido de la base de datos:', primer_idProyecto_pk);

        // Enviar una respuesta con el id_proyect obtenido
        res.status(200).send(`Id del proyecto: ${primer_idProyecto_pk}`);
    } catch (error) {
        console.error('Error al obtener el id_proyect de la base de datos:', error);
        res.status(500).send('Error al obtener el id_proyect de la base de datos');
    }
};*/


module.exports.render_usuario = async(req,res) =>{
    res.render("usuarios/usuario");
}