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
            p.nombreProyecto,
            p.descripcionProyecto,
            p.departamento,
            p.estatus,
            p.fechaInicio,
            p.fechaFinal,
            p.porcentajeRiesgo,
            a.descripcionAccion,
            r.descripcionRiesgo,
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
            p.idProyecto = ?;
        `;
            const [resumed] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            console.log('PROYECTO INFO', resumed);
            return resumed; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    }
};
