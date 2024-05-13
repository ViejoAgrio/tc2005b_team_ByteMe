const mariadb = require("mariadb");
const pool = mariadb.createPool({
host:"127.0.0.1",
user:"root",
password:"1002151513",
database: "users_test",
connectionLimit:5,
port:3308
});

module.exports = async () => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        throw error; // Re-throw the error for proper handling
    }
};