const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(my_id_proyect, my_username, my_password) {
        this.id_proyect = my_id_proyect
        this.nombreUsuario = my_username;
        this.password = my_password;
    }
    async saveResumed() {
        try {
            const connection = await db(); 
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
                p.porcentajeRiesgo DESC;`;
            var resumed = await connection.execute(query);
            await connection.release();
            return resumed; 
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
            console.error('Error al ejecutar eliminación:', error);
            throw error;
        }
    }

    async selectProject(){
        try {
            //Select project properties
            
            const connection = await db();

            const selectProyectoQuery = `
                SELECT * 
                FROM proyecto 
                WHERE idProyecto = ?;
            `;

            const response = await connection.execute(selectProyectoQuery, [this.id_proyect]);
            await connection.release()
            return response[0];
            
        } catch (error) {
            console.error('Error al consultar proyecto: ', error);
            throw error;
        }
    }

    async selectRiesgoProject(){
        try {
            //Select riesgoprojecto properties
            
            const connection = await db();

            const selectRiesgoProyectoQuery = `
                SELECT * 
                FROM riesgoproyecto
                WHERE idProyecto = ?;
            `;

            const response = await connection.execute(
                selectRiesgoProyectoQuery,
                [this.id_proyect]
            );
            
            await connection.release()
            return response;
            
        } catch (error) {
            console.error('Error al consultar tabla riesgoproyecto: ', error);
            throw error;
        }
    }

    async selectAccionProject(){
        try {
            //Select accionprojecto properties
            
            const connection = await db();

            const selectAccionProyectoQuery = `
                SELECT * 
                FROM accionproyecto 
                WHERE idProyecto = ?;
            `;

            const response = await connection.execute(
                selectAccionProyectoQuery,
                [this.id_proyect]
            );

            await connection.release()
            return response;
            
        } catch (error) {
            console.error('Error al consultar tabla accionproyecto: ', error);
            throw error;
        }
    }

    async selectEmpresaCliente(){
        try {
            //Select empresacliente properties
            
            const connection = await db();

            const selectEmpresaClienteQuery = `
                SELECT *
                FROM empresacliente 
                WHERE idProyecto = ?;
            `;

            const response = await connection.execute(selectEmpresaClienteQuery, [this.id_proyect]);
            await connection.release()
            return response[0];
            
        } catch (error) {
            console.error('Error al consultar tabla empresacliente: ', error);
            throw error;
        }
    }

    async save_planAccionProject(listaPlanAccion,idProyecto) {
        const connection = await db();

        const query = `
            INSERT INTO accionproyecto 
            (idProyecto, idAccion, estatusAccion)
            VALUES (?, ?, ?);
        `;

        for (const planAccion of listaPlanAccion) {
            const values = [
                idProyecto,
                planAccion.idAccion,
                planAccion.estatusAccion
            ];
            await connection.query(query, values);
        }

        await connection.release();
    }

    async save_riesgoProject(listaRiesgoProject,idProyecto) {
        const connection = await db();

        const query = `
            INSERT INTO riesgoproyecto 
            (idProyecto, idRiesgo, nivelRiesgo)
            VALUES (?, ?, ?);
        `;

        for (const riesgoProj of listaRiesgoProject) {
            const values = [
                idProyecto,
                riesgoProj.idRiesgo,
                riesgoProj.nivelRiesgo
            ];
            await connection.query(query, values);
        }

        await connection.release();
    }
}
