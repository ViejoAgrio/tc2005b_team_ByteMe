const User = require('../models/admin.model.js');
const { formatearFecha } = require("../public/js/controllerFuncionts.js");

module.exports.render_admin = async (req, res) => {
    try {

        const newUser = new User(1);
        const resumed = await newUser.saveResumed();
          
        resumed.forEach(proyecto => {
            proyecto.fechaInicio = formatearFecha(proyecto.fechaInicio);
            proyecto.fechaFinal = formatearFecha(proyecto.fechaFinal);
          });

        console.log('RESUMED:', resumed);
        
        const empresas = await newUser.saveEmpresas();

        const proyectosPorPagina = 9;
        const totalPaginas = Math.ceil(resumed.length / proyectosPorPagina);
        const paginaActual = parseInt(req.query.page) || 1;
        const startIndex = (paginaActual - 1) * proyectosPorPagina;
        const endIndex = startIndex + proyectosPorPagina;
      
        const proyectosPaginados = resumed.slice(startIndex, endIndex);

        res.render("admin/admin", {
            resumedProyects: proyectosPaginados,
            paginaActual: paginaActual,
            totalPaginas: totalPaginas,
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

module.exports.render_change_password = async(req, res) => {
    res.render('admin/change-password');
}