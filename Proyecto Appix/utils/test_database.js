const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host:"localhost",
    user:"root",
    password:"1002151513",
    database: "appix",
    connectionLimit:5,
    port: 3308
});

module.exports = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
};

// Función para realizar la conexión y ejecutar una consulta de prueba
async function testConnection() {
    let conn;
    try {
        // Realizar la conexion
        conn = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos MariaDB');
  
        // Ejecutar una consulta de prueba
        const filas = await conn.query('SELECT * FROM riesgo');
        console.log('Filas devueltas:', filas);
  
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    } finally {
        if (conn) return conn.end();
    }
}

async function testInsert() {
    let conn;
    try {
        //Haces la conexion
        conn = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos MariaDB');

        await conn.query(
            'INSERT INTO riesgo ' + 
            '(idProyecto, descripcionRiesgo, nivelRiesgo) ' +
            'VALUES (?, ?, ?)',
            [7, "Test",2]
        );
        console.log('Inserción exitosa');
    }
    catch{
        console.error('Error al insertar datos:', error);
    } finally {
        if (conn) return conn.end();
    }
}
// Llamar a la función para probar la conexión

testConnection();
//testInsert();