const np = require('../models/newProject.model.js');
const db = require('../utils/database.js');


module.exports.render_newProject = async (req, res) => {
    res.render('admin/nuevo-proyecto');
};

module.exports.getClients = async (req, res) => {
    try {
        // Send a response back to the client
        objProject = new np.Project();
        clientList = await objProject.getClients();
        res.json(clientList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.getRiesgos = async (req, res) => {
    try{
        // Send a response back to the riesgos
        const objProject = new np.Project();
        const riesgosTable  = await objProject.get_Riesgo();
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
        const objProject = new np.Project();
        const planAccionTable  = await objProject.get_PlanAccion();
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
        const descripcionProyecto = req.body.descripcionProyecto;
        const departamento        = req.body['departamento'];
        const selectedEstatus     = req.body['estatus'];
        const fechaInicio         = req.body.fechaInicio;
        const fechaFinal          = req.body.fechaFinal;
        const porcentajeRiesgo    = req.body.porcentajeRiesgo;
        //const empresa             = req.body.empresa;
        //const encargado           = req.body.encargado;        

        const objProject = new np.Project(nombreProyecto,
                                          descripcionProyecto,
                                          departamento,
                                          selectedEstatus, 
                                          fechaInicio, 
                                          fechaFinal,
                                          porcentajeRiesgo);
        const saveProj = await objProject.save_Project(res,req);
        
        //await np.saveNewProject(res, nombreProyecto/*idProyecto, descripcionRiesgo, nivelRiesgo*/);
        
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