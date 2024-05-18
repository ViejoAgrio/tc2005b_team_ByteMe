const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    async saveResumed() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT nombreProyecto, estatus, fechaInicio, fechaFinal, porcentajeRiesgo 
            FROM proyecto
            ORDER BY porcentajeRiesgo DESC;`
            const resumed = await connection.execute(query);
            await connection.release(); // Liberar la conexión
            return resumed; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async saveHidden() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT nombreEmpresa from cliente;`
            const hidden = await connection.execute(query);
            await connection.release(); // Liberar la conexión
            return hidden; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
}

module.exports.render_nuevo_proyecto = async (req, res) => {
    res.render('admin/nuevo-proyecto');
};

module.exports.save_nuevo_proyecto = async (req, res) => {
    const { nombreEncargado, nombreEmpresa, nombreProyecto, descripcionProyecto, fechaInicio, fechaFinal, descripcionAccion } = req.body;

    try {
        const newProject = new Project(
            nombreEncargado,
            nombreEmpresa,
            nombreProyecto,
            descripcionProyecto,
            fechaInicio,
            fechaFinal,
            descripcionAccion
        );

        await newProject.save();
        
        res.status(201).send('Proyecto guardado exitosamente');
    } catch (error) {
        console.error('Error al guardar el proyecto:', error);
        res.status(500).send('Error al guardar el proyecto');
    }
};