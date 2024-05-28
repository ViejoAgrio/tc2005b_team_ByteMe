const db = require('../utils/database.js');

module.exports = class User {
    constructor(my_id_proyect) {
        this.id_proyect = my_id_proyect;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    async saveResumed() {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = `SELECT 
            p.*,
            c.nombreEmpresa,
            IFNULL((
                SELECT 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'idRiesgo', r.idRiesgo,
                            'descripcionRiesgo', r.descripcionRiesgo,
                            'nivelRiesgo', r.nivelRiesgo
                        )
                        ORDER BY r.nivelRiesgo DESC
                    )
                FROM 
                    riesgo r
                WHERE 
                    r.idProyecto = p.idProyecto
            ), '[]') AS riesgos
        FROM 
            proyecto p
        JOIN 
            cliente c ON p.idCliente = c.idCliente
        GROUP BY 
            p.idProyecto, c.nombreEmpresa
        ORDER BY 
            p.porcentajeRiesgo DESC;`
            var resumed = await connection.execute(query);
            resumed.forEach(proyecto => {
                // Convertir el atributo riesgos de string a JSON
                proyecto.riesgos = JSON.parse(proyecto.riesgos);
            });
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
}
