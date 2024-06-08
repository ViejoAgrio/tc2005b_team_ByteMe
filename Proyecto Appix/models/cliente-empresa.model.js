const db = require('../utils/database.js');

module.exports.Cliente = class {
    constructor(my_nombreEncargado) {
        this.nombreEncargado = my_nombreEncargado;
    }

    // MÉTODOS 
    async get_Cliente() {
        try {
            const connection = await db();
            const query = `SELECT nombreEncargado FROM cliente`;
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
}

module.exports.Empresa = class {
    constructor(my_nombreEmpresa) {
        this.nombreEmpresa = my_nombreEmpresa;
    }

    // MÉTODOS 
    async get_Empresa() {
        try {
            const connection = await db();
            const query = `SELECT nombreEmpresa FROM empresa`;
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
}