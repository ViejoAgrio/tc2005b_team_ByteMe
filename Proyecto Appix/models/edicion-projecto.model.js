const db = require('../utils/database.js');

module.exports.Project = class {
    constructor (my_nombreProyecto,
                 my_descripcionProyecto,
                 my_departamento,
                 my_selectedEstatus, 
                 my_fechaInicio, 
                 my_fechaFinal,
                 my_porcentajeRiesgo,
                 my_idCliente,
                 my_idEmpresa,
                 my_listaRiesgoId,
                 my_listaRiesgoLevel,
                 my_listaPlanAccionId
                ){
        
        this.nombreProyecto      = my_nombreProyecto;
        this.fechaInicio         = my_fechaInicio;
        this.fechaFinal          = my_fechaFinal;
        this.departamento        = my_departamento;
        this.selectedEstatus     = my_selectedEstatus;
        this.porcentajeRiesgo    = my_porcentajeRiesgo;
        this.descripcionProyecto = my_descripcionProyecto;
        this.idCliente           = my_idCliente;
        this.idEmpresa           = my_idEmpresa;
        this.listaRiesgoId       = my_listaRiesgoId;
        this.listaRiesgoLevel    = my_listaRiesgoLevel;
        this.listaPlanAccionId   = my_listaPlanAccionId;
    }

    //MÉTODOS 
    
    async save_Project(res,req){
        try{
            let insertedId = 0;
            
            const connection = await db();
            const queryProyecto = `INSERT INTO proyecto 
                            (nombreProyecto,
                             descripcionProyecto,
                             departamento,
                             estatus, 
                             fechaInicio, 
                             fechaFinal,
                             porcentajeRiesgo)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const valueProyecto = [this.nombreProyecto,
                           this.descripcionProyecto,
                           this.departamento,
                           this.selectedEstatus,
                           this.fechaInicio,
                           this.fechaFinal,
                           this.porcentajeRiesgo
                           ];
            const resNewProject = await connection.query(
                queryProyecto,
                valueProyecto
            );
            const queryIdProy = `
                SELECT idProyecto 
                FROM proyecto 
                ORDER BY idProyecto 
                DESC LIMIT 1;
            `;
            const resIdSelect = await connection.query(
                queryIdProy
            );
            await connection.release();
            return resIdSelect[0];
        }
        catch (error) {
            res.status(500).send(`Error al guardar el proyecto: ${error}`);
        }
    };

    async save_riskProject(res,req,idProject){
        let cntRisk = 0;

        const connection = await db();
        const query = `
            INSERT INTO riesgoproyecto (idProyecto, idRiesgo, nivelRiesgo)
            VALUES (?, ?, ?);
        `;
        
        for (const idRisk of this.listaRiesgoId) {
            const values = [
                idProject,
                idRisk,
                this.listaRiesgoLevel[cntRisk]
            ];
            await connection.query(query, values);
            cntRisk++;
        }
        await connection.release();
    }

    async save_planAccionProject(res, req, idProject) {
        let cntPlan = 0;

        const connection = await db();
        const query = `
            UPDATE accionproyecto (idProyecto, idAccion, estatusAccion)
            VALUES (?, ?, ?);
        `;
        
        for (const idPlan of this.listaPlanAccionId) {
            const values = [
                idProject,
                idPlan,
                0
            ];
            await connection.query(query, values);
        }
        await connection.release();
    }

    async save_clientEmpresaProject(res, req, idEmpresa, idCliente, idProject) {
        const connection = await db();
        const query = `
            UPDATE empresacliente 
            SET idEmpresa = ?, idCliente = ? 
            WHERE idProyecto = ?;
        `;
        
        const values = [
            idEmpresa,
            idCliente,
            idProject
        ];
        await connection.query(query, values);
        await connection.release();
    }

    async selectProject(idProyecto){
        try {
            //Select project properties
            
            const connection = await db();

            const selectProyectoQuery = `
                SELECT * 
                FROM proyecto 
                WHERE idProyecto = ?;
            `;

            const [response] = await connection.execute(
                selectProyectoQuery, 
                idProyecto
            );
            await connection.release()
            return response;
            
        } catch (error) {
            return error;
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

    async updateProject(res, req, idProject) {
        try {
            const connection = await db();
            const queryProyecto = `UPDATE proyecto SET 
                            nombreProyecto = ?, 
                            descripcionProyecto = ?, 
                            departamento = ?, 
                            estatus = ?, 
                            fechaInicio = ?, 
                            fechaFinal = ?, 
                            porcentajeRiesgo = ?
                            WHERE idProyecto = ?`;
            const valueProyecto = [
                this.nombreProyecto,
                this.descripcionProyecto,
                this.departamento,
                this.selectedEstatus,
                this.fechaInicio,
                this.fechaFinal,
                this.porcentajeRiesgo,
                idProject
            ];
            await connection.query(queryProyecto, valueProyecto);
            await connection.release();
        } catch (error) {
            res.status(500).send(`Error al actualizar el proyecto: ${error}`);
        }
    }

    async updatePlanAccionProject(listaPlanAccion,idProyecto) {
        try {
            const connection = await db();
            const queryProyecto = `
                UPDATE accionproyecto 
                SET idAccion = ?, estatusAccion = ? 
                WHERE idProyecto = ?;
            `;
            await connection.query(queryProyecto, valueProyecto);
            await connection.release();
        } catch (error) {
            res.status(500).send(`Error al actualizar el proyecto: ${error}`);
        }
        
    }

    async save_riesgoProject(listaRiesgoProject,idProyecto) {
        const connection = await db();

        const updateQuery = `
            UPDATE riesgoproyecto 
            SET idRiesgo = ?, nivelRiesgo = ? 
            WHERE idProyecto = ?;
        `;
        
        const values = [
            idRiesgo,
            idCliente,
            idProject
        ];
        await connection.query(updateQuery, values);
        await connection.release();
    }

    async save_clientEmpresaProject(res, req, idEmpresa, idCliente, idProject) {
        const connection = await db();
    
        const updateQuery = `
            UPDATE empresacliente 
            SET idEmpresa = ?, idCliente = ? 
            WHERE idProyecto = ?;
        `;
        
        const values = [
            idEmpresa,
            idCliente,
            idProject
        ];
        await connection.query(updateQuery, values);
        await connection.release();
    }
}






module.exports.PlanAccion = class {
    constructor (my_descripcionAccion)
    {
        this.descripcionAccion = my_descripcionAccion;
    }

    //MÉTODOS 
    
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