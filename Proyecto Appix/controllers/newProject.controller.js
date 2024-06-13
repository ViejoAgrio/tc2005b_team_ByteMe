const np = require('../models/newProject.model.js');
const db = require('../utils/database.js');


module.exports.render_newProject = async (req, res) => {
    res.render('admin/nuevo-proyecto');
};

module.exports.getClientes = async (req, res) => {
    try {
        // Send a response back to the client
        objClient = new np.Client();
        clientList = await objClient.getClientes();
        res.json(clientList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.getEmpresas = async (req, res) => {
    try {
        const objEmpresa = new np.Empresa();
        const empresasTable = await objEmpresa.getEmpresas();
        res.json(empresasTable);
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        res.status(500).send('Error al obtener empresa');
    }
};

module.exports.getRiesgos = async (req, res) => {
    try{
        // Send a response back to the riesgos
        const objRiesgo = new np.Riesgo();
        const riesgosTable  = await objRiesgo.get_Riesgo();
        res.json(riesgosTable);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los riesgos' });
    }
    console.log("Test");
};

module.exports.getPlanAccion = async (req, res) => {
    try{
        // Send a response back to the plan de accion
        const objPlanAccion = new np.PlanAccion();
        const planAccionTable  = await objPlanAccion.get_PlanAccion();
        res.json(planAccionTable);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los planes de accion' });
    }
    console.log("Test");
};

module.exports.postNewProject = async (req, res) => {
    try {
        
        //const test = req.body.estatus;
        //res.status(test);
        const nombreProyecto      = req.body.nombreProyecto;
        const fechaInicio         = req.body.fechaInicio;
        const fechaFin            = req.body.fechaFinal;
        const selectedEstatus     = req.body['estatus'];
        const departamento        = req.body['departamento'];
        const descripcionProyecto = req.body.descripcionProyecto;
        const porcentajeRiesgo    = req.body.porcentajeRiesgo;
        //const clienteSeleccionado = req.body['clients-lst'];
        const listaRiesgos        = req.body.selectedRisks;
        res.status(200).send(Object.keys(listaRiesgos).length);
        console.log(nombreProyecto);
        //const objProject = new np.Project(clienteSeleccionado,
        //                                  nombreProyecto,
        //                                  descripcionProyecto,
        //                                  departamento,
        //                                  selectedEstatus, 
        //                                  fechaInicio, 
        //                                  fechaFin,
        //                                  porcentajeRiesgo);
        //const saveProj = await objProject.save_Project(res,req);
    }
    catch (error) {
        //console.error('Error al guardar el proyecto:', error);
        res.status(500).send(`Error al guardar el proyecto: ${error}`);
    }
};


module.exports.duplicateNewProject = (req, res) => {
    res.send('Duplicate');
};

module.exports.deleteNewProject = (req, res) => {
    res.send('Delete');
};