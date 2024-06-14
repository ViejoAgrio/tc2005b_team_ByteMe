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
            INSERT INTO accionproyecto (idProyecto, idAccion, estatusAccion)
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
            INSERT INTO empresacliente (idEmpresa, idCliente, idProyecto)
            VALUES (?, ?, ?);
        `;
        
        const values = [
            idEmpresa,
            idCliente,
            idProject
        ];
        await connection.query(query, values);
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