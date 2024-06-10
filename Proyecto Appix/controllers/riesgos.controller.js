const np = require('../models/riesgos.model.js');

module.exports.render_riesgos = async (req, res) => {
    try {
        const objRiesgo = new np.Riesgo();
        const riesgosTable = await objRiesgo.get_Riesgo();
        res.render('admin/riesgos', 
            { 
                riesgosTable: JSON.stringify(riesgosTable) 
            }
        );
    } catch (error) {
        console.error('Error al obtener los riesgos:', error);
        res.status(500).send('Error al obtener los riesgos');
    }
};

module.exports.get_riesgos = async (req, res) => {
    try {
        const objRiesgo = new np.Riesgo();
        const riesgosTable = await objRiesgo.get_Riesgo();
        res.json(riesgosTable);
    } catch (error) {
        console.error('Error al obtener los riesgos:', error);
        res.status(500).send('Error al obtener los riesgos');
    }
};

module.exports.add_riesgos = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        const objRisk = new np.Riesgo();
        await objRisk.add(nuevoNombre);
        const riesgosTable = await objRisk.get_Riesgo();
        res.redirect('/admin/riesgos');
    } catch (error) {
        console.error('Error al agregar el riesgo:', error);
        res.status(500).send('Error al agregar el riesgo');
    }
};

module.exports.update_riesgo = async (req, res) => {
    try {
        const { idRiesgo, descripcionRiesgo } = req.body;
        console.log('datos obtenidos en controller: ', idRiesgo, descripcionRiesgo);
        const objRiesgo = new np.Riesgo(idRiesgo, descripcionRiesgo);
        console.log('obejto riesgo', objRiesgo);
        await objRiesgo.update(idRiesgo, descripcionRiesgo);
        const updatedRiesgo = await objRiesgo.get_ById(idRiesgo);
        console.log('Empresa actualizadooooo', updatedRiesgo);
        res.json({ riesgo: updatedRiesgo[0] });
    } catch (error) {
        console.error('Error al actualizar riesgo:', error);
        res.status(500).send('Error al actualizar riesgo');
    }
};
    
module.exports.delete_riesgo = async (req, res) => {
    try {
        const { idRiesgo } = req.body;
        const objRiesgo = new np.Riesgo();
        await objRiesgo.delete(idRiesgo);
        const riesgoTable = await objRiesgo.get_Riesgo();
        res.redirect('/admin/riesgos');
    } catch (error) {
        console.error('Error al eliminar riesgo:', error);
        res.status(500).send('Error al eliminar riesgo');
    }
};

