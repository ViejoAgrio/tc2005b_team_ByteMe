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


/*module.exports.postNewActionPlan = async (req, res) => {
    try {
        // Recoge los datos del cuerpo de la solicitud
        const descripcionAccion = req.body.descripcionAccion;

        // Crea una nueva instancia de ActionPlan
        const objActionPlan = new ActionPlan(descripcionAccion);

        // Llama al método save_ActionPlan para guardar el nuevo plan de acción
        const saveActionPlan = await objActionPlan.save_ActionPlan(res, req);
        
        // Responde con éxito
        res.status(201).json({ message: 'Plan de acción guardado exitosamente', data: saveActionPlan });
    } catch (error) {
        // Maneja los errores y responde con un mensaje de error
        res.status(500).send(`Error al guardar el plan de acción: ${error}`);
    }
};*/

/*module.exports.postNewProject = async(req,res) => {
    try {
        const {
            idProyecto, 
            descripcionRiesgo, 
            nivelRiesgo
        } = req.body;

        if (!descripcionRiesgo || !nivelRiesgo){
            return res.status(400).send("Todos los campos son obligatorios");
        }

        await np.saveNewProject(idProyecto, descripcionRiesgo, nivelRiesgo);
        
        res.send("Inserción exitosa");
    }

    catch (error)  {
        console.error('Error al ejecutar consulta:', error);
        res.status(500).send('Error al ejecutar consulta');
    }
};
*/

//    const { nombreProyecto,
//            fechaInicio, 
//            fechaFinal, 
//            empresa, 
//            departamento, 
//            estatus, 
//            encargado, 
//            porcentajeRiesgo, 
//            descripcionProyecto 
//    } = req.body;
//    
//    try { const newProject = {
//          nombreProyecto,
//          fechaInicio,
//          fechaFinal,
//          empresa,
//          departamento,
//          estatus,
//          encargado,
//          porcentajeRiesgo,
//          descripcionProyecto
//        }
//        alert("Test")
//        res.status(201).send('Proyecto guardado exitosamente');
//    } 
//    catch (error) {
//    console.error('Error al guardar el proyecto:', error);
//    res.status(500).send('Error al guardar el proyecto');
//};
//
//newProjectModel.postNewProject(newProject, (err, idProyecto) => {
//        if (err) {
//            return res.status(500).send('Error al crear el proyecto');
//        }
//        res.redirect('/'); 
//    });
//};




module.exports.duplicateNewProject = (req, res) => {
    res.send('Duplicate');
};

module.exports.deleteNewProject = (req, res) => {
    res.send('Delete');
};
