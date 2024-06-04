const Project = require('../models/detalles.model.js');
const { formatearFecha } = require("../public/js/controllerFuncionts.js");

module.exports.render_detalles = async (req, res) => {
    const projectId = req.params.id; // Obtiene el ID del proyecto desde la URL
    try {
        const newUser = new Project(projectId);
        const project = await newUser.saveProyecto(projectId);
        const encargado = await newUser.saveEncargado(projectId);
        const empresa = await newUser.saveEmpresa(projectId);
        const riesgos = await newUser.saveRisks(projectId);
        const acciones = await newUser.saveAccions(projectId);

        if (!project) {
            return res.status(404).send('Proyecto no encontrado');
        }
        // Formatear las fechas antes de pasarlas a la vista
        project.fechaInicio = formatearFecha(project.fechaInicio);
        project.fechaFinal = formatearFecha(project.fechaFinal);
        res.render('usuarios/detalles', { 
            project: project,
            encargado: encargado,
            empresa: empresa,
            riesgos: riesgos,
            acciones: acciones
        });
        } catch (error) {
            console.error(`Error en render_detalles: ${error}`);
            res.status(500).send('Error interno del servidor');
        }
};

module.exports.update_checkbox = async (req, res) => {
    const { idAccion, isChecked } = req.body;
    try {
        const newUser = new Project(0);
        console.log('Checked', isChecked, 'idAccion', typeof idAccion);
        const check = await newUser.updateCheckbox(idAccion, isChecked);
    } catch (error) {
        console.error(`Error en render_detalles: ${error}`);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports.eliminarProyecto = async (req, res) => {
    const { idProyecto } = req.body;
    try {
        const project = new Project(idProyecto);
        await project.deleteProject(idProyecto);
        
        res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ message: 'Error al eliminar el proyecto' });
    }
};