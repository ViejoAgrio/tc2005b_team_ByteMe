const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(my_id_proyect, my_username, my_password) {
        this.id_proyect = my_id_proyect
        this.nombreUsuario = my_username;
        this.password = my_password;
    }
    //Este método servirá para buscar un usuario por username
    //Es estático ya que a diferencia de save(), el primero se guarda al crear un usuario siempre, pero en este segundo podmeos buscar un usuario sin crear un nuevo objeto usuario.
    async saveResumed() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT proyecto.*, cliente.nombreEmpresa
            FROM proyecto
            JOIN cliente ON proyecto.idCliente = cliente.idCliente
            ORDER BY porcentajeRiesgo DESC;`
            const resumed = await connection.execute(query);
            await connection.release(); // Liberar la conexión
            return resumed; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
    async saveEmpresas() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT nombreEmpresa from cliente;`
            const empresas = await connection.execute(query);
            await connection.release(); // Liberar la conexión
            return empresas; // Devolver el resultado de la consulta
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }

    static async findUser(username) {
        try {
            const connection = await db();
            const result = await connection.execute( 'Select * from empleado WHERE nombreUsuario = ?', [username]);
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }

    static async newPassword(username, newPassword) {
        try {
            const connection = await db();
            //const hash = await bcrypt.hash(newPassword, 10);
            const result = await connection.execute('UPDATE empleado SET password = ? WHERE nombreUsuario = ?', [newPassword, username]);
            await connection.release();
            return result;
        } catch (error) {
            throw error; // Re-throw the error for proper handling
        }
    }
}
