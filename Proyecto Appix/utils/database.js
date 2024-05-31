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

module.exports = { pool };