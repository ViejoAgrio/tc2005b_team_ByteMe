const Project = require('../models/detalles.model.js');
const { formatearFecha } = require("../public/js/controllerFuncionts.js");

module.exports.render_detalles = async (req, res) => {
    const projectId = req.params.id; // Obtiene el ID del proyecto desde la URL
    try {
        const newUser = new Project(projectId);
        const project = await newUser.saveResumed(projectId);
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
        const check = await newUser.updateCheckbox(idAccion, isChecked);
    } catch (error) {
        console.error(`Error en render_detalles: ${error}`);
        res.status(500).send('Error interno del servidor');
    }
};