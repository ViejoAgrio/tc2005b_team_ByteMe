const db = require('../utils/database.js');
const bcrypt = require('bcryptjs');

module.exports.Project = class {
    constructor (my_cliente,
                 my_nombreProyecto,
                 my_descripcionProyecto,
                 my_departamento,
                 my_selectedEstatus, 
                 my_fechaInicio, 
                 my_fechaFinal,
                 my_porcentajeRiesgo){
        
        this.clienteProyecto     = my_cliente;
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
            const connection = await db();
            const query = `INSERT INTO proyecto 
                            (nombreProyecto,
                             descripcionProyecto,
                             departamento,
                             estatus, 
                             fechaInicio, 
                             fechaFinal,
                             porcentajeRiesgo)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const value = [this.nombreProyecto,
                           this.descripcionProyecto,
                           this.departamento,
                           this.selectedEstatus,
                           this.fechaInicio,
                           this.fechaFinal,
                           this.porcentajeRiesgo
                           ];
            const resNewProject = await connection.query(query, value);
            await connection.release();
            res.status(201).redirect("/admin/admin")
            return resNewProject;
        }
        catch (error) {
            res.status(500).send(`Error al guardar el proyecto: ${error}`);
        }
    };
}


module.exports.PlanAccion = class {
    constructor (my_descripcionAccion)
    {
        this.descripcionAccion = my_descripcionAccion;
    }

    //MÉTODOS 
    //async save_PlanAccion(res, req) {
    //    try {
    //        const connection = await db();
    //        const query = `INSERT INTO accion 
    //                        (idProyecto,
    //                         descripcionAccion,
    //                         estadoRealizacion)
    //                       VALUES (?, ?, ?)`;
    //        const values = [
    //            1,
    //            this.descripcionAccion,
    //            0
    //        ];
//
    //        const resplanAccion = await connection.query(query,values);
    //        return resplanAccion;
    //    }
    //    catch (error) {
    //        //console.error('Error al guardar el proyecto:', error);
    //        return false;
    //    }
    //};

    async get_PlanAccion(){
        try{
            const connection = await db();
            const queryPlanAccion = `SELECT idAccion, descripcionAccion
                                     FROM accion`;
            const resPlanAccion = await connection.query(queryPlanAccion);
            await connection.release();
            return resPlanAccion;
        }
        catch (error) {
            res.status(500).send(`Error al obtener el plan de acción: ${error}`);
        }
    }

    async updateCheckbox(idAccion, isChecked) {
        try {
            const connection = await db(); // Obtener conexión a la base de datos
            const query = 'UPDATE accionproyecto SET estatusAccion = ? WHERE idAccion = ?;';
            connection.query(query, [isChecked, idAccion], (error, results) => {
                if (error) {
                    console.log('MAL');
                    console.error('Error al actualizar el estado del checkbox:', error);
                    res.status(500).json({ success: false, message: 'Error al actualizar el estado del checkbox' });
                } else {
                    console.log('BIEN');
                    res.json({ success: true, message: 'Estado del checkbox actualizado correctamente' });
                }
            });
            await connection.release();
        } catch (error) {
            console.error('Error al ejecutar consulta:', error);
            throw error; // Re-throw para manejar el error fuera de la clase
        } 
    }
}


module.exports.Client = class {
    constructor (my_idCliente,
                 my_nombreEncargado
                ){

        this.idCliente           = my_idCliente;
        this.nombreEncargado     = my_nombreEncargado;
    }

    //MÉTODOS 

    async getClientes(){
        try{
            const connection = await db();
            const queryClient = `SELECT *
                                 FROM cliente`;
            const resClient = await connection.query(queryClient);
            await connection.release();
            return resClient;
        }
        catch (error) {
            res.status(500).send(`Error al obtener el cliente: ${error}`);
        }
    }
}


module.exports.Empresa = class {
    constructor (my_idEmpresa,
                 my_nombreEmpresa
                ){

        this.idEmpresa           = my_idEmpresa;
        this.nombreEmpresa       = my_nombreEmpresa;
    }
    
    //METODOS
    async getEmpresas() {
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
}

module.exports.Riesgo = class {
    constructor (my_idRiesgo,
                 my_descripcionRiesgo,
                 my_nivelRiesgo
                ){

        this.idRiesgo               = my_idRiesgo;
        this.descripcionRiesgo      = my_descripcionRiesgo;
        this.nivelRiesgo            = my_nivelRiesgo;
    }

    //MÉTODOS 
    async get_Riesgo(){
        try{
            const connection = await db();
            const queryRiesgo = `
                SELECT *
                FROM riesgo;`;
            const resRiesgo = await connection.query(queryRiesgo);
            await connection.release();
            return resRiesgo;
        }
        catch (error) {
            res.status(500).send(`Error al obtener el riesgo: ${error}`);
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