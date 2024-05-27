const User = require('../models/admin.model.js');
const { formatearFecha } = require("../public/js/controllerFuncionts.js");

module.exports.render_admin = async (req, res) => {
    try {
        const newUser = new User(1);
        const resumed = await newUser.saveResumed();
        
        // Formatear las fechas
        resumed.forEach(proyecto => {
            proyecto.fechaInicio = formatearFecha(proyecto.fechaInicio);
            proyecto.fechaFinal = formatearFecha(proyecto.fechaFinal);
        });
        
        const empresas = await newUser.saveEmpresas();

        // Obtener los valores de los selectores de la URL (GET request)
        const estatus = req.query.estatus || 'Todos';
        const departamento = req.query.departamento || 'Todos';
        const empresa = req.query.empresa || 'Todos';

        console.log('Filters received:', { estatus, departamento, empresa });

        // Filtrar los proyectos según los selectores
        const proyectosFiltrados = resumed.filter(proyecto => {
            return (estatus === 'Todos' || proyecto.estatus === estatus) &&
                   (departamento === 'Todos' || proyecto.departamento === departamento) &&
                   (empresa === 'Todos' || proyecto.nombreEmpresa === empresa);
        });

        console.log('Filtered projects:', proyectosFiltrados);

        const proyectosPorPagina = 9;
        const totalPaginas = Math.ceil(proyectosFiltrados.length / proyectosPorPagina);
        const paginaActual = parseInt(req.query.page) || 1;
        const startIndex = (paginaActual - 1) * proyectosPorPagina;
        const endIndex = startIndex + proyectosPorPagina;
      
        const proyectosPaginados = proyectosFiltrados.slice(startIndex, endIndex);

        res.render("admin/admin", {
            resumedProyects: proyectosPaginados,
            paginaActual: paginaActual,
            totalPaginas: totalPaginas,
            empresas: empresas,
            selectedEstatus: estatus,
            selectedDepartamento: departamento,
            selectedEmpresa: empresa
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