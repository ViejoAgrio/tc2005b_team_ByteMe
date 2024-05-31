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
            const query = `SELECT 
            p.idProyecto,
            p.nombreProyecto,
            p.descripcionProyecto,
            p.departamento,
            p.estatus,
            p.fechaInicio,
            p.fechaFinal,
            p.porcentajeRiesgo,
            e.nombreEmpresa,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idRiesgoProyecto', rp.idRiesgoProyecto,
                    'nivelRiesgo', rp.nivelRiesgo,
                    'idRiesgo', r.idRiesgo,
                    'descripcionRiesgo', r.descripcionRiesgo
                ) ORDER BY rp.nivelRiesgo DESC
            ) AS riesgos
        FROM 
            proyecto p
        LEFT JOIN 
            riesgoProyecto rp ON p.idProyecto = rp.idProyecto
        LEFT JOIN 
            riesgo r ON rp.idRiesgo = r.idRiesgo
        LEFT JOIN 
            empresaCliente ec ON p.idProyecto = ec.idProyecto
        LEFT JOIN 
            empresa e ON ec.idEmpresa = e.idEmpresa
        GROUP BY 
            p.idProyecto
        ORDER BY 
            p.porcentajeRiesgo DESC;           
        `;
            var resumed = await connection.execute(query);
            console.log('BBBBBB', resumed);
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
            const query = `SELECT nombreEmpresa from empresa;`
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

    async deleteProject(id_proyect) {
        try {
            const connection = await db();
            
            // Eliminar riesgos asociados al proyecto
            const deleteRiesgosQuery = 'DELETE FROM riesgo WHERE idProyecto = ?';
            await connection.execute(deleteRiesgosQuery, [id_proyect]);

            // Eliminar acciones asociadas al proyecto
            const deleteAccionesQuery = 'DELETE FROM accion WHERE idProyecto = ?';
            await connection.execute(deleteAccionesQuery, [id_proyect]);

            // Eliminar el proyecto
            const deleteProyectoQuery = 'DELETE FROM proyecto WHERE idProyecto = ?';
            await connection.execute(deleteProyectoQuery, [id_proyect]);

            await connection.release();
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error;
        }
    }
}
