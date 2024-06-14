const edProj = require('../models/edicion-projecto.model.js');
const db = require('../utils/database.js');
const { formatearFechaReverse } = require("../public/js/controllerFuncionts.js");

module.exports.render_edicionProject = async (req, res) => {
    try {
        const idProyecto  = req.query.idProyecto;
        const proyectoObj = new edProj.Project();

        const proyecto = await proyectoObj.selectProject(idProyecto);
        
        if (!proyecto) {
            return res.status(404).send("Proyecto no encontrado.");
        }

        proyecto.fechaInicio = formatearFechaReverse(proyecto.fechaInicio);
        proyecto.fechaFinal = formatearFechaReverse(proyecto.fechaFinal);

        res.render('admin/edicion-proyecto',{
            proyecto, proyecto
        });
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        res.status(500).send('Internal Server Error: ', error);
    }
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
        const nombreProyecto      = req.body.nombreProyecto;
        const fechaInicio         = req.body.fechaInicio;
        const fechaFin            = req.body.fechaFinal;
        const selectedEstatus     = req.body['estatus'];
        const departamento        = req.body['departamento'];
        const descripcionProyecto = req.body.descripcionProyecto;
        const porcentajeRiesgo    = req.body.porcentajeRiesgo;
        var clienteId             = {};
        var empresaId             = {};
        var listaPlanAccionIds    = {};
        var listaRiesgosIds       = {};
        var listaRiesgosLevel     = {};
        
        var banderaCliente       = false;
        var banderaEmpresa       = false;
        var banderaAddPlanAccion = false;
        var banderaAddRiesgos    = false;
        
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
                                          porcentajeRiesgo,
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

        res.status(201).redirect("/admin/admin")
    }
    catch (error) {
        //console.error('Error al guardar el proyecto:', error);
        res.status(500).send(`Error al guardar el proyecto: ${error}`);
    }
};

module.exports.get_proyecto = async (req, res) => {
    const { idProyecto } = req.body;
    try {
        var banderaRiesgos  = false;
        var banderaAcciones = false;
        var banderaAddPlanAccion = false;
        var banderaAddRiesgos    = false;

        const project = new edProj.Project(idProyecto);

        // Consultas relacionadas al proyecto
        const projectProperties = await project.selectProject();
        
        const riesgoProjectProperties = await project.selectRiesgoProject();

        const accionProjectProperties = await project.selectAccionProject();

        const empresaClienteProjectProperties = await project.selectEmpresaCliente();
        
        // Validación de datos indispensables
        if (!projectProperties) {
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }

        if(!empresaClienteProjectProperties){
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }
        
        res.status(200).json({ message: 'Proyecto copiado correctamente' });
    } catch (error) {
        console.error('Error al copiar el proyecto:', error);
        res.status(500).json({ message: 'Error al copiar el proyecto' });
    }
};

module.exports.copiar_proyecto = async (req, res) => {
    const { idProyecto } = req.body;
    try {
        var banderaRiesgos  = false;
        var banderaAcciones = false;
        var banderaAddPlanAccion = false;
        var banderaAddRiesgos    = false;

        const project = new User(idProyecto);

        // Consultas relacionadas al proyecto
        const projectProperties = await project.selectProject();
        
        const riesgoProjectProperties = await project.selectRiesgoProject();

        const accionProjectProperties = await project.selectAccionProject();

        const empresaClienteProjectProperties = await project.selectEmpresaCliente();
        
        // Validación de datos indispensables
        if (!projectProperties) {
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }

        if(!empresaClienteProjectProperties){
            res.status(500).json(
                { message: 'Error al copiar el proyecto: Proyecto no encontrado' }
            );
        }

        /*my_nombreProyecto,
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
        my_listaPlanAccionId*/


        // Insersiones a las tablas pertinentes
        const oldProjectProp = new npModel.Project(
            projectProperties.nombreProyecto + " - copia",
            projectProperties.descripcionProyecto,
            projectProperties.departamento,
            projectProperties.estatus,
            projectProperties.fechaInicio,
            projectProperties.fechaFinal,
            projectProperties.porcentajeRiesgo,
            empresaClienteProjectProperties.idCliente,
            empresaClienteProjectProperties.idEmpresa
        );

        const nuevoProyecto = await oldProjectProp.save_Project();
        
        await oldProjectProp.save_clientEmpresaProject(
            res,
            req,
            oldProjectProp.idEmpresa,
            oldProjectProp.idCliente,
            nuevoProyecto.idProyecto
        );
        
        if(accionProjectProperties){
            await project.save_planAccionProject(
                accionProjectProperties,
                nuevoProyecto.idProyecto
            );
        }

        if(riesgoProjectProperties){
            await project.save_riesgoProject(
                riesgoProjectProperties,
                nuevoProyecto.idProyecto
            );
        }

        res.status(200).json({ message: 'Proyecto copiado correctamente' });
    } catch (error) {
        console.error('Error al copiar el proyecto:', error);
        res.status(500).json({ message: 'Error al copiar el proyecto' });
    }
};
