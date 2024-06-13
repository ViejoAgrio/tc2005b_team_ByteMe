const db = require('../utils/database.js');

module.exports.Pendiente = class {
    constructor(my_idAccion, my_descripcionAccion) {
        this.idAccion = my_idAccion;
        this.descripcionAccion = my_descripcionAccion;
    }

    // MÉTODOS 
    async get_Pendiente() {
        try {
            const connection = await db();
            const query = `SELECT idAccion, descripcionAccion FROM accion`;
            const res = await connection.query(query);
            await connection.release();
            return res;
        } catch (error) {
            console.error('Error al obtener el pendiente:', error);
            throw error;
        }
    }

    async add(descripcionAccion) {
        try {
            const connection = await db();
            const query = `INSERT INTO accion (descripcionAccion) VALUES (?)`;
            await connection.query(query, [descripcionAccion]);
            await connection.release();
        } catch (error) {
            console.error('Error al agregar el pendiente:', error);
            throw error;
        }
    }

    async update(idAccion, descripcionAccion) {
        try {
            const connection = await db();
            const query = `UPDATE accion SET descripcionAccion = ? WHERE idAccion = ?`;
            await connection.query(query, [descripcionAccion, idAccion]);
            await connection.release();
        } catch (error) {
            console.error('Error al actualizar pendiente:', error);
            throw error;
        }
    }

    async get_ById(idAccion) {
        try {
            const connection = await db();
            const results = await connection.execute(`SELECT idAccion, descripcionAccion 
                                                    FROM accion WHERE idAccion = ?`, [idAccion]);
            await connection.release();
            console.log("Resultado de la consulta en get_Pendiente_ById:", results);
            return results; 
        } catch (error) {
            console.error('Error al obtener pendiente por ID:', error);
            throw error;
        }
    }

    async delete(idAccion) {
        try {
            const connection = await db();
            const query = `DELETE FROM accion WHERE idAccion = ?`;
            await connection.query(query, [idAccion]);
            await connection.release();
        } catch (error) {
            console.error('Error al eliminar pendiente:', error);
            throw error;
        }
    }
}