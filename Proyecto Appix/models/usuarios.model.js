const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    async save() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT MIN(idProyecto_pk) AS primer_idProyecto_pk FROM proyecto WHERE idProyecto_pk = ?;`;
            const [rows] = await connection.execute(query, [this.id_proyect]);
            await connection.release(); // Liberar la conexión

            console.log('DATO:', rows[0]);
            return rows; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
}
