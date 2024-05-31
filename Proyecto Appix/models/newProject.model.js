const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports.Project = class {
    constructor (my_nombreProyecto,
                 my_descripcionProyecto,
                 my_departamento,
                 my_selectedEstatus, 
                 my_fechaInicio, 
                 my_fechaFinal,
                 my_porcentajeRiesgo){

        this.nombreProyecto      = my_nombreProyecto;
        this.fechaInicio         = my_fechaInicio;
        this.fechaFinal          = my_fechaFinal;
        this.departamento        = my_departamento;
        this.selectedEstatus     = my_selectedEstatus;
        this.porcentajeRiesgo    = my_porcentajeRiesgo;
        this.descripcionProyecto = my_descripcionProyecto;
    }

    //MÉTODOS 


    async save_Project(res,req){
        try{
            const connection = await db.pool.getConnection();
            const query = `INSERT INTO proyecto 
                            (idCliente,
                             nombreProyecto,
                             descripcionProyecto,
                             departamento,
                             estatus, 
                             fechaInicio, 
                             fechaFinal,
                             porcentajeRiesgo)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const value = [2,
                           this.nombreProyecto,
                           this.descripcionProyecto,
                           this.departamento,
                           this.selectedEstatus,
                           this.fechaInicio,
                           this.fechaFinal,
                           this.porcentajeRiesgo
                           ];
            const resNewProject = await connection.query(query, value);
            res.status(201).redirect("/admin/admin")
            return resNewProject;
        }
        catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    };

    /*async save_ActionPlan(res, req) {
        try {
            const connection = await db.pool.getConnection();
            const query = `INSERT INTO accion 
                            (idProyecto,
                             descripcionAccion,
                             estadoRealizacion)
                           VALUES (?, ?, ?, ?)`;
            const values = [
                1,
                this.descripcionAccion,
                0
            ];
            const resNewActionPlan = await connection.query(query, values);
            return resNewActionPlan;
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        }
    };*/
    

    async getClients(){
        try{
            const connection = await db.pool.getConnection();
            const queryClient = `SELECT *
                                 FROM cliente`;
            const resClient = await connection.query(queryClient);
            return resClient;
        }
        catch (error) {
            //console.error('Error al guardar el proyecto:', error);
            res.status(500).send(`Error al guardar el proyecto: ${error}`);
        }
    }

    async get_Riesgo(){
        try{
            const connection = await db.pool.getConnection();
            const queryRiesgo = `SELECT idRiesgo, descripcionRiesgo, nivelRiesgo
                                 FROM riesgo`;
            const resRiesgo = await connection.query(queryRiesgo);
            return resRiesgo;
        }
        catch (error) {
            //console.error('Error al guardar el proyecto:', error);
            res.status(500).send(`Error al guardar el proyecto: ${error}`);
        }
    }

    async get_PlanAccion(){
        try{
            const connection = await db.pool.getConnection();
            const queryPlanAccion = `SELECT idAccion, descripcionAccion
                                     FROM accion`;
            const resPlanAccion = await connection.query(queryPlanAccion);
            return resPlanAccion;
        }
        catch (error) {
            //console.error('Error al guardar el proyecto:', error);
            res.status(500).send(`Error al guardar el proyecto: ${error}`);
        }
    }
}











//--------------------------------
//module.exports.saveNewProject = async (res,req) => {
//    try
//    {
//        const connection = await db.pool.getConnection();
//        const query = `SELECT nombreProyecto, estatus, fechaInicio, fechaFinal, porcentajeRiesgo 
//                FROM proyecto
//                ORDER BY porcentajeRiesgo DESC;`;
//        
//        query_res = await connection.query(query);
//        res.send(query_res);
//    }
//    catch(error) {
//        console.error('Error al ejecutar consulta:', error);
//        throw error; // Re-throw para manejar el error fuera de la clase
//    }
//};


//--------------------------------
//module.exports.saveNewProject = async (res,req) => {
//    try {
//        const connection = await db.pool.getConnection();
//        const query = `INSERT INTO riesgo 
//                        (idProyecto, 
//                        descripcionRiesgo, 
//                        nivelRiesgo)
//                        VALUES (?, ?, ?)`;
//        const value = [12, "TestInsert", 5];
//        const query_res = await connection.query(query, value);
//        res.send("Inserción exitosa");
//    }
//    catch (error) {
//        console.error('Error al ejecutar consulta:', error);
//        throw error; // Re-throw para manejar el error fuera de la clase
//    }
//};
//--------------------------------


//module.exports.saveNewProject = async (res, nombreProyecto/*,idProyecto, descripcionRiesgo, nivelRiesgo*/) => {
 //   res.send(nombreProyecto);
    
    /*try {
        const connection = await db.pool.getConnection();
        const query = `INSERT INTO riesgo 
                        (idProyecto, 
                        descripcionRiesgo, 
                        nivelRiesgo)
                        VALUES (?, ?, ?)`;
        const value = [idProyecto, descripcionRiesgo, nivelRiesgo];
        const query_res = await connection.query(query, value);
        res.send("Inserción exitosa");
    }
    catch (error) {
        console.error('Error al ejecutar consulta:', error);
        throw error; // Re-throw para manejar el error fuera de la clase
    }*/
//};


//module.exports.saveNewProject = async (res,req) => {
//    try {
//        const connection = await db.pool.getConnection();
//        const query = `INSERT INTO riesgo 
//                        (idProyecto, 
//                        descripcionRiesgo, 
//                        nivelRiesgo)
//                        VALUES (?, ?, ?)`;
//        const value = [12, "TestInsert", 5];
//        const query_res = await connection.query(query, value);
//        res.send("Inserción exitosa");
//    }
//    catch (error) {
//        console.error('Error al ejecutar consulta:', error);
//        throw error; // Re-throw para manejar el error fuera de la clase
//    }
//};



//--------------------------------
//
//module.exports.postNewProject = (project, callback) => {
//    const { nombreProyecto, fechaInicio, fechaFin, empresa, departamento, estatus, encargado, porcentajeRiesgo, descripcionProyecto } = project;
//    const stmt = await.db.prepare(`INSERT INTO projects (nombreProyecto, fechaInicio, fechaFin, empresa, departamento, estatus, encargado, porcentajeRiesgo, descripcionProyecto)
//    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//    `);
//    stmt.run(nombreProyecto, fechaInicio, fechaFin, empresa, departamento, estatus, encargado, porcentajeRiesgo, descripcionProyecto, function(err) {
//        callback(err, this.lastID);
//    });
//    stmt.finalize();
//};