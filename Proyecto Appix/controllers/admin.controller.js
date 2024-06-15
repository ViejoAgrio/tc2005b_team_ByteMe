const User    = require('../models/admin.model.js');
const npModel = require('../models/newProject.model.js');
const bcrypt = require('bcryptjs')
const { formatearFecha, calcularPorcentajeRiesgo } = require("../public/js/controllerFuncionts.js");

module.exports.render_admin = async (req, res) => {
    try {
        const newUser = new User(1);
        const resumed = await newUser.saveResumed();
        //const porcentajeRiesgo = await calcularPorcentajeRiesgo(1);
        //console.log('porcentajeRiesgo: ', porcentajeRiesgo);
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

        //console.log('Filters received:', { estatus, departamento, empresa });

        // Filtrar los proyectos según los selectores
        const proyectosFiltrados = resumed.filter(proyecto => {
            return (estatus === 'Todos' || proyecto.estatus === estatus) &&
                   (departamento === 'Todos' || proyecto.departamento === departamento) &&
                   (empresa === 'Todos' || proyecto.nombreEmpresa === empresa);
        });

        //console.log('Filtered projects:', proyectosFiltrados);

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

module.exports.render_change_password = async(req, res) => {
    res.render('admin/change-password');
}

module.exports.post_change_password = async (req, res) => {
    const { username, newPassword, confirmedPassword } = req.body;

    if (newPassword !== confirmedPassword) {
        return res.status(400).json({ message: 'La contraseña no coincide' });
    }

    try {
        const user = await User.findUser(username);
        
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
    
        await User.newPassword(username, hashedPassword);
        return res.status(200).json({ message: 'La contraseña ha sido cambiada' });
    } catch (err) {
        console.error('Error changing password:', err);
        return res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};

module.exports.eliminar_proyecto = async (req, res) => {
    const { idProyecto } = req.body;
    try {
        const project = new User(idProyecto);
        await project.deleteProject(idProyecto);
        res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ message: 'Error al eliminar el proyecto' });
    }
};

module.exports.copiar_proyecto = async (req, res) => {
    const { idProyecto } = req.body;
    try {
        var banderaRiesgos  = false;
        var banderaAcciones = false;
        var banderaAddPlanAccion = false;
        var banderaAddRiesgos    = false;

        const project = new User(idProyecto);

        // Consultas relacionadas al proyecto
        const projectProperties = await project.selectProject();
        
        const riesgoProjectProperties = await project.selectRiesgoProject();

        const accionProjectProperties = await project.selectAccionProject();

        const empresaClienteProjectProperties = await project.selectEmpresaCliente();
        
        // Validación de datos indispensables
        if (!projectProperties) {
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }

        if(!empresaClienteProjectProperties){
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }

        /*my_nombreProyecto,
        my_descripcionProyecto,
        my_departamento,
        my_selectedEstatus, 
        my_fechaInicio, 
        my_fechaFinal,
        my_porcentajeRiesgo,
        my_idCliente,
        my_idEmpresa,
        my_listaRiesgoId,
        my_listaRiesgoLevel,
        my_listaPlanAccionId*/


        // Insersiones a las tablas pertinentes
        const oldProjectProp = new npModel.Project(
            projectProperties.nombreProyecto + " - copia",
            projectProperties.descripcionProyecto,
            projectProperties.departamento,
            projectProperties.estatus,
            projectProperties.fechaInicio,
            projectProperties.fechaFinal,
            projectProperties.porcentajeRiesgo,
            empresaClienteProjectProperties.idCliente,
            empresaClienteProjectProperties.idEmpresa
        );

        const nuevoProyecto = await oldProjectProp.save_Project();
        
        await oldProjectProp.save_clientEmpresaProject(
            res,
            req,
            oldProjectProp.idEmpresa,
            oldProjectProp.idCliente,
            nuevoProyecto.idProyecto
        );
        
        if(accionProjectProperties){
            await project.save_planAccionProject(
                accionProjectProperties,
                nuevoProyecto.idProyecto
            );
        }

        if(riesgoProjectProperties){
            await project.save_riesgoProject(
                riesgoProjectProperties,
                nuevoProyecto.idProyecto
            );
        }

        res.status(200).json({ message: 'Proyecto copiado correctamente' });
    } catch (error) {
        console.error('Error al copiar el proyecto:', error);
        res.status(500).json({ message: 'Error al copiar el proyecto' });
    }
};