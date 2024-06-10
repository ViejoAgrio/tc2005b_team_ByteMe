const np = require('../models/pendientes.model.js');

module.exports.render_pendientes = async (req, res) => {
    try {
        const objPendiente = new np.Pendiente();
        const pendientesTable = await objPendiente.get_Pendiente();
        res.render('admin/pendientes', 
            { 
                pendientesTable: JSON.stringify(pendientesTable)
            }
        );
    } catch (error) {
        console.error('Error al obtener los pendientes:', error);
        res.status(500).send('Error al obtener los pendientes');
    }
};

module.exports.get_pendientes = async (req, res) => {
    try {
        const objPendiente = new np.Pendiente();
        const pendientesTable = await objPendiente.get_Pendiente();
        res.json(pendientesTable);
    } catch (error) {
        console.error('Error al obtener los pendientes:', error);
        res.status(500).send('Error al obtener los pendientes');
    }
};

module.exports.add_pendientes= async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        const objPendiente = new np.Pendiente();
        await objPendiente.add(nuevoNombre);
        const pendientesTable = await objPendiente.get_Pendiente();
        res.redirect('/admin/pendientes');
    } catch (error) {
        console.error('Error al agregar el pendiente:', error);
        res.status(500).send('Error al agregar el pendiente');
    }
};

module.exports.update_pendiente = async (req, res) => {
    try {
        const { idAccion, descripcionAccion } = req.body;
        console.log('datos obtenidos en controller: ', idAccion, descripcionAccion);
        const objPendiente = new np.Pendiente(idAccion, descripcionAccion);
        console.log('obejto pendiente', objPendiente);
        await objPendiente.update(idAccion, descripcionAccion);
        const updatedPendiente = await objPendiente.get_ById(idAccion);
        console.log('Pendiente actualizadooooo', updatedPendiente);
        res.json({ pendiente: updatedPendiente[0] });
    } catch (error) {
        console.error('Error al actualizar pendiente:', error);
        res.status(500).send('Error al actualizar pendiente');
    }
};
    
module.exports.delete_pendiente = async (req, res) => {
    try {
        const { idAccion } = req.body;
        const objPendiente = new np.Pendiente();
        await objPendiente.delete(idAccion);
        const pendientesTable = await objPendiente.get_Pendiente();
        res.redirect('/admin/pendientes');
    } catch (error) {
        console.error('Error al eliminar pendientes:', error);
        res.status(500).send('Error al eliminar pendientes');
    }
};