const np = require('../models/newProject.model.js');
const { formatearFecha, calcularPorcentajeRiesgo } = require("../public/js/controllerFuncionts.js");
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
};

module.exports.postNewProject = async (req, res) => {
    try {
        const nombreProyecto      = req.body.nombreProyecto;
        const fechaInicio         = req.body.fechaInicio;
        const fechaFin            = req.body.fechaFinal;
        const selectedEstatus     = req.body['estatus'];
        const departamento        = req.body['departamento'];
        const descripcionProyecto = req.body.descripcionProyecto;
        var clienteId             = {};
        var empresaId             = {};
        var listaPlanAccionIds    = {};
        var listaRiesgosIds       = {};
        var listaRiesgosLevel     = {};
        
        var banderaCliente       = false;
        var banderaEmpresa       = false;
        var banderaAddPlanAccion = false;
        var banderaAddRiesgos    = false;
        
        // Validación de checkboxes obligatorios
        if(!req.body.hiddenClientInput_Chk || !req.body.hiddenEmpInput_Chk) {
            return res.status(400).send('Error: Debe seleccionar tanto el cliente como la empresa.');
        }

        // Se obtiene la cliente
        if(req.body.hiddenClientInput_Chk != null)
        {
            clienteId      = req.body.hiddenClientInput_Chk;
            banderaCliente = true;
        }

        // Se obtiene la empresa
        if(req.body.hiddenEmpInput_Chk != null)
        {
            empresaId      = req.body.hiddenEmpInput_Chk;
            banderaEmpresa = true;
        }

        // Se obtiene la lista de los planes de acción
        if(req.body.hiddenAccInput_Chk != null)
        {
            listaPlanAccionIds   = req.body.hiddenAccInput_Chk;
            banderaAddPlanAccion = true;
        }

        // Se obtiene la lista de los riesgos
        if(req.body.hiddenInput_isChecked != null &
           req.body.hiddenInput_value != null)
        {
            listaRiesgosIds   = req.body.hiddenInput_isChecked;
            listaRiesgosLevel = req.body.hiddenInput_value;
            banderaAddRiesgos = true;
        }
        
        const objProject = new np.Project(nombreProyecto,
                                          descripcionProyecto,
                                          departamento,
                                          selectedEstatus, 
                                          fechaInicio, 
                                          fechaFin,
                                          10,
                                          clienteId,
                                          empresaId,
                                          listaRiesgosIds,
                                          listaRiesgosLevel,
                                          listaPlanAccionIds);
        
        // Guardado en tabla proyecto y obtención de id del nuevo proyecto
        const projectArrayId = await objProject.save_Project(res,req);
        
        if(banderaCliente && banderaEmpresa)
        {
            await objProject.save_clientEmpresaProject(res,req, empresaId, clienteId, projectArrayId.idProyecto);
        }

        if(banderaAddPlanAccion)
        {
            await objProject.save_planAccionProject(res,req,projectArrayId.idProyecto);
        }

        if(banderaAddRiesgos)
        {
            await objProject.save_riskProject(res,req,projectArrayId.idProyecto);
        }
        const porcentajeRiesgo = await calcularPorcentajeRiesgo(projectArrayId.idProyecto);
        await objProject.updatePorcentajeRiesgo(projectArrayId.idProyecto, porcentajeRiesgo);

        res.status(201).redirect("/admin/admin")
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