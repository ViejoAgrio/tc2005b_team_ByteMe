const Project = require('../models/detalles.model.js');

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO); // Crear objeto Date a partir de la cadena ISO 8601
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Meses son indexados desde 0 (enero) hasta 11 (diciembre)
    const anio = fecha.getFullYear();
    return `${dia < 10 ? '0' + dia : dia} / ${mes < 10 ? '0' + mes : mes} / ${anio}`;
}

module.exports.render_detalles = async (req, res) => {
    const projectId = req.params.id; // Obtiene el ID del proyecto desde la URL
    try {
        const newUser = new Project(projectId);
        const project = await newUser.saveResumed(projectId);

        if (!project) {
            return res.status(404).send('Proyecto no encontrado');
        }

        // Formatear las fechas antes de pasarlas a la vista
        project.fechaInicio = formatearFecha(project.fechaInicio);
        project.fechaFinal = formatearFecha(project.fechaFinal);

        res.render('usuarios/detalles', { project });
    } catch (error) {
        console.error(`Error en render_detalles: ${error}`);
        res.status(500).send('Error interno del servidor');
    }
};