const User = require('../models/usuarios.model.js');
const bcrypt = require('bcryptjs');

module.exports.render_usuario = async (req, res) => {
    try {

        const newUser = new User(1);
        const resumed = await newUser.saveResumed();
        
        function formatearFecha(fechaISO) {
            const fecha = new Date(fechaISO); // Crear objeto Date a partir de la cadena ISO 8601
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1; // Meses son indexados desde 0 (enero) hasta 11 (diciembre)
            const anio = fecha.getFullYear();
            return `${dia < 10 ? '0' + dia : dia} / ${mes < 10 ? '0' + mes : mes} / ${anio}`;
          }
          
        resumed.forEach(proyecto => {
            proyecto.fechaInicio = formatearFecha(proyecto.fechaInicio);
            proyecto.fechaFinal = formatearFecha(proyecto.fechaFinal);
          });
          
        // Mostrar los proyectos con fechas formateadas
        console.log('RESUMED:', resumed);
        
        const empresas = await newUser.saveEmpresas();

        console.log('Empresas:', empresas);

        res.render("usuarios/usuario", {
            resumedProyects: resumed,
            empresas: empresas
        });

    } catch (error) {
        console.error('Error al obtener registro de la base de datos:', error);
        res.status(500).send('Error al obtener registro de la base de datos');
    }
};


module.exports.render_nuevo_proyecto = async(req,res) =>{
    res.render('admin/nuevo-proyecto');
}