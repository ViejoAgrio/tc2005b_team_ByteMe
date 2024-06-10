const db = require('../utils/database.js');

module.exports.Cliente = class {
    constructor(my_idCliente, my_nombreEncargado) {
        this.idCliente = my_idCliente;
        this.nombreEncargado = my_nombreEncargado;
    }

    // MÉTODOS 
    async get_Cliente() {
        try {
            const connection = await db();
            const query = `SELECT idCliente, nombreEncargado FROM cliente`;
            const res = await connection.query(query);
            await connection.release();
            return res;
        } catch (error) {
            console.error('Error al obtener cliente:', error);
            throw error;
        }
    }

    async add(nombreEncargado) {
        try {
            const connection = await db();
            const query = `INSERT INTO cliente (nombreEncargado) VALUES (?)`;
            await connection.query(query, [nombreEncargado]);
            await connection.release();
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            throw error;
        }
    }

    async update(idCliente, nombreEncargado) {
        try {
            const connection = await db();
            const query = `UPDATE cliente SET nombreEncargado = ? WHERE idCliente = ?`;
            await connection.query(query, [nombreEncargado, idCliente]);
            await connection.release();
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            throw error;
        }
    }

    async get_ById(idCliente) {
        try {
            const connection = await db();
            const results = await connection.execute(`SELECT idCliente, nombreEncargado FROM cliente WHERE idCliente = ?`, [idCliente]);
            await connection.release();
            console.log("Resultado de la consulta en get_Cliente_ById:", results);
            return results; 
        } catch (error) {
            console.error('Error al obtener cliente por ID:', error);
            throw error;
        }
    }

    async delete(idCliente) {
        try {
            const connection = await db();
            const query = `DELETE FROM cliente WHERE idCliente = ?`;
            await connection.query(query, [idCliente]);
            await connection.release();
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
}

module.exports.Empresa = class {
    constructor(my_idEmpresa, my_nombreEmpresa) {
        this.idEmpresa = my_idEmpresa;
        this.nombreEmpresa = my_nombreEmpresa;
    }

    // MÉTODOS 
    async get_Empresa() {
        try {
            const connection = await db();
            const query = `SELECT idEmpresa, nombreEmpresa FROM empresa`;
            const res = await connection.query(query);
            await connection.release();
            return res;
        } catch (error) {
            console.error('Error al obtener empresa:', error);
            throw error;
        }
    }

    async add(nombreEmpresa) {
        try {
            const connection = await db();
            const query = `INSERT INTO empresa (nombreEmpresa) VALUES (?)`;
            await connection.query(query, [nombreEmpresa]);
            await connection.release();
        } catch (error) {
            console.error('Error al agregar empresa:', error);
            throw error;
        }
    }

    async update(idEmpresa, nombreEmpresa) {
        try {
            const connection = await db();
            const query = `UPDATE empresa SET nombreEmpresa = ? WHERE idEmpresa = ?`;
            await connection.query(query, [nombreEmpresa, idEmpresa]);
            await connection.release();
        } catch (error) {
            console.error('Error al actualizar empresa:', error);
            throw error;
        }
    }

    async get_ById(idEmpresa) {
        try {
            const connection = await db();
            const results = await connection.execute(`SELECT idEmpresa, nombreEmpresa FROM empresa WHERE idEmpresa = ?`, [idEmpresa]);
            await connection.release();
            console.log("Resultado de la consulta en get_Cliente_ById:", results);
            return results; 
        } catch (error) {
            console.error('Error al obtener empresa por ID:', error);
            throw error;
        }
    }

    async delete(idEmpresa) {
        try {
            const connection = await db();
            const query = `DELETE FROM empresa WHERE idEmpresa = ?`;
            await connection.query(query, [idEmpresa]);
            await connection.release();
        } catch (error) {
            console.error('Error al eliminar empresa:', error);
            throw error;
        }
    }
}