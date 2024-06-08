const np = require('../models/cliente-empresa.model.js');

module.exports.render_clienteEmpresa = async (req, res) => {
    try {
        const objRiesgo = new np.Riesgo();
        const riesgosTable = await objRiesgo.get_Riesgo();
        res.render('admin/cliente-empresa', 
            { 
                riesgosTable: JSON.stringify(riesgosTable) 
            }
        );
    } catch (error) {
        console.error('Error al obtener los riesgos:', error);
        res.status(500).send('Error al obtener los riesgos');
    }
};

module.exports.get_clienteEmpresa = async (req, res) => {
    try {
        const objRiesgo = new np.Riesgo();
        const riesgosTable = await objRiesgo.get_Riesgo();
        res.json(riesgosTable);
    } catch (error) {
        console.error('Error al obtener los riesgos:', error);
        res.status(500).send('Error al obtener los riesgos');
    }
};

module.exports.add_clienteEmpresa = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        const objRisk = new np.Riesgo();
        await objRisk.add(nuevoNombre);
        const riesgosTable = await objRisk.get_Riesgo();
        res.redirect('/admin/cliente-empresa');
    } catch (error) {
        console.error('Error al agregar el riesgo:', error);
        res.status(500).send('Error al agregar el riesgo');
    }
};