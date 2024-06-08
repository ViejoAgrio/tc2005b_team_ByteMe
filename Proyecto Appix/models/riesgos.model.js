const db = require('../utils/database.js');

module.exports.Riesgo = class {
    constructor(my_descripcionRiesgo) {
        this.descripcionRiesgo = my_descripcionRiesgo;
    }

    // MÉTODOS 
    async get_Riesgo() {
        try {
            const connection = await db();
            const queryRiesgo = `SELECT descripcionRiesgo FROM riesgo`;
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
}
