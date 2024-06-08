const db = require('../utils/database.js');

module.exports.Pendiente = class {
    constructor(my_descripcionAccion) {
        this.descripcionAccion = my_descripcionAccion;
    }

    // MÉTODOS 
    async get_Pendiente() {
        try {
            const connection = await db();
            const query = `SELECT descripcionAccion FROM accion`;
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
}