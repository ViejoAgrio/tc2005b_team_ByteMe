const db = require('../utils/database.js');

module.exports = class Project {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    async saveProyecto(id_proyect) {
        try {
            const connection = await db();
            const query = `SELECT * FROM proyecto p WHERE idProyecto = ?;`;
            const [proyecto] = await connection.execute(query, [id_proyect]);
            await connection.release();
            return proyecto; 
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
    async saveEncargado(id_proyect) {
        try {
            const connection = await db(); 
            const query = `SELECT c.nombreEncargado
            FROM empresaCliente AS ec
            JOIN cliente AS c ON ec.idCliente = c.idCliente
            WHERE ec.idProyecto = ?;`;
            const [encargado] = await connection.execute(query, [id_proyect]);
            await connection.release();
            return encargado; 
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
    async saveEmpresa(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT e.nombreEmpresa
            FROM empresaCliente AS ec
            JOIN empresa AS e ON ec.idEmpresa = e.idEmpresa
            WHERE ec.idProyecto = ?;`;
            const [empresa] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            return empresa; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    }
    async saveRisks(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT r.descripcionRiesgo
            FROM riesgoproyecto AS rp
            JOIN riesgo AS r ON rp.idRiesgo = r.idRiesgo
            WHERE rp.idProyecto = ?
            ORDER BY rp.nivelRiesgo DESC;`
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
            const query = `SELECT a.descripcionAccion, ap.estatusAccion, ap.idAccion 
            FROM accionproyecto AS ap
            JOIN accion AS a ON ap.idAccion = a.idAccion
            WHERE ap.idProyecto = ?;`
            const acciones = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            console.log('ACCIONES INFO', acciones);
            return acciones; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async updateCheckbox(idAccion, isChecked) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = 'UPDATE accionproyecto SET estatusAccion = ? WHERE idAccion = ?;';
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

            const deleteClienteQuery = 'DELETE FROM empresaCliente WHERE idProyecto = ?';
            await connection.execute(deleteClienteQuery, [id_proyect]);
            
            const deleteRiesgosQuery = 'DELETE FROM riesgoProyecto WHERE idProyecto = ?';
            await connection.execute(deleteRiesgosQuery, [id_proyect]);

            const deleteAccionesQuery = 'DELETE FROM accionProyecto WHERE idProyecto = ?';
            await connection.execute(deleteAccionesQuery, [id_proyect]);

            const deleteProyectoQuery = 'DELETE FROM proyecto WHERE idProyecto = ?';
            await connection.execute(deleteProyectoQuery, [id_proyect]);

            await connection.release();
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
}
