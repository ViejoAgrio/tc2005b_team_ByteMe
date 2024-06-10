const db = require('../utils/database.js');

module.exports.Riesgo = class {
    constructor(my_idRiesgo, my_descripcionRiesgo) {
        this.idRiesgo = my_idRiesgo;
        this.descripcionRiesgo = my_descripcionRiesgo;
    }

    // MÉTODOS 
    async get_Riesgo() {
        try {
            const connection = await db();
            const queryRiesgo = `SELECT idRiesgo, descripcionRiesgo FROM riesgo`;
            const resRiesgo = await connection.query(queryRiesgo);
            await connection.release();
            return resRiesgo;
        } catch (error) {
            console.error('Error al obtener el riesgo:', error);
            throw error;
        }
    }

    async add(descripcionRiesgo) {
        try {
            const connection = await db();
            const query = `INSERT INTO riesgo (descripcionRiesgo) VALUES (?)`;
            await connection.query(query, [descripcionRiesgo]);
            await connection.release();
        } catch (error) {
            console.error('Error al agregar el riesgo:', error);
            throw error;
        }
    }

    async update(idRiesgo, descripcionRiesgo) {
        try {
            const connection = await db();
            const query = `UPDATE riesgo SET descripcionRiesgo = ? WHERE idRiesgo = ?`;
            await connection.query(query, [descripcionRiesgo, idRiesgo]);
            await connection.release();
        } catch (error) {
            console.error('Error al actualizar riesgo:', error);
            throw error;
        }
    }

    async get_ById(idRiesgo) {
        try {
            const connection = await db();
            const results = await connection.execute(`SELECT idRiesgo, descripcionRiesgo 
                                                    FROM riesgo WHERE idRiesgo = ?`, [idRiesgo]);
            await connection.release();
            console.log("Resultado de la consulta en get_Riesgo_ById:", results);
            return results; 
        } catch (error) {
            console.error('Error al obtener riesgo por ID:', error);
            throw error;
        }
    }

    async delete(idRiesgo) {
        try {
            const connection = await db();
            const query = `DELETE FROM riesgo WHERE idRiesgo = ?`;
            await connection.query(query, [idRiesgo]);
            await connection.release();
        } catch (error) {
            console.error('Error al eliminar riesgo:', error);
            throw error;
        }
    }
}
