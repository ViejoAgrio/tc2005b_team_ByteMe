const db = require('../utils/database.js');

module.exports = class porcentajeRiesgoModel {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    async saveDates(id_proyect) {
        try {
            const connection = await db();
            const query = `SELECT fechaInicio, fechaFinal FROM proyecto p WHERE idProyecto = ?;`;
            const [proyecto] = await connection.execute(query, [id_proyect]);
            await connection.release();
            return proyecto; 
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
    async saveNumberRisks(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT COUNT(*) AS numeroRiesgos FROM riesgoProyecto WHERE idProyecto = ?;`
            const [numeroRiesgos] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            //console.log('RIESGOS INFO', typeof numeroRiesgos.numeroRiesgos);
            return numeroRiesgos; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async saveRisksLevel(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT nivelRiesgo FROM riesgoProyecto WHERE idProyecto = ?;`;
            const nivelesRiesgo = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            //console.log('RIESGOS INFO', riesgos);
            return nivelesRiesgo; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async saveEstatus(id_proyect) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT estatus FROM proyecto WHERE idProyecto = ?;`;
            const [estatus] = await connection.execute(query, [id_proyect]);
            await connection.release(); // Liberar la conexión
            //console.log('RIESGOS INFO', riesgos);
            return estatus; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
}
