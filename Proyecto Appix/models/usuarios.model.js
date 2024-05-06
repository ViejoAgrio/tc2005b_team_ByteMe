const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    async save() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT porcentajeRiesgo from tiene`
            const rows = await connection.execute(query);
            await connection.release(); // Liberar la conexión
            return rows; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
}
