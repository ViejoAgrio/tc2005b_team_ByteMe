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