const db = require('../utils/database.js');

module.exports = class Project {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }

    static async getProjectById(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = 'SELECT * FROM proyecto WHERE idProyecto = ?';
            const [rows] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            return rows[0]; // Devolver el primer resultado  
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    }

    async saveResumed(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT
                    p.idProyecto, 
                    p.nombreProyecto,
                    p.descripcionProyecto,
                    p.departamento,
                    p.estatus,
                    p.fechaInicio,
                    p.fechaFinal,
                    p.porcentajeRiesgo,
                    c.nombreEncargado,
                    c.nombreEmpresa
                FROM 
                    proyecto p
                LEFT JOIN 
                    accion a ON p.idProyecto = a.idProyecto
                LEFT JOIN 
                    riesgo r ON p.idProyecto = r.idProyecto
                LEFT JOIN 
                    cliente c ON p.idCliente = c.idCliente
                WHERE 
                    p.idProyecto = ?;`;
            const [resumed] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            console.log('PROYECTO INFO', resumed);
            return resumed; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    }
    async saveRisks(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT r.* FROM riesgo r WHERE r.idProyecto = ?;`
            const riesgos = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            console.log('RIESGOS INFO', riesgos);
            return riesgos; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async saveAccions(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT a.* FROM accion a WHERE a.idProyecto = ?;`
            const acciones = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            console.log('RIESGOS INFO', acciones);
            return acciones; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async updateCheckbox(idAccion, isChecked) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = 'UPDATE accion SET estadoRealizacion = ? WHERE idAccion = ?';
            connection.query(query, [isChecked, idAccion], (error, results) => {
                if (error) {
                    console.log('MAL');
                    console.error('Error al actualizar el estado del checkbox:', error);
                    res.status(500).json({ success: false, message: 'Error al actualizar el estado del checkbox' });
                } else {
                    console.log('BIEN');
                    res.json({ success: true, message: 'Estado del checkbox actualizado correctamente' });
                }
            });
            await connection.release();
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async deleteProject(id_proyect) {
        try {
            const connection = await db();
            
            // Eliminar riesgos asociados al proyecto
            const deleteRiesgosQuery = 'DELETE FROM riesgo WHERE idProyecto = ?';
            await connection.execute(deleteRiesgosQuery, [id_proyect]);

            // Eliminar acciones asociadas al proyecto
            const deleteAccionesQuery = 'DELETE FROM accion WHERE idProyecto = ?';
            await connection.execute(deleteAccionesQuery, [id_proyect]);

            // Eliminar el proyecto
            const deleteProyectoQuery = 'DELETE FROM proyecto WHERE idProyecto = ?';
            await connection.execute(deleteProyectoQuery, [id_proyect]);

            await connection.release();
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
};
