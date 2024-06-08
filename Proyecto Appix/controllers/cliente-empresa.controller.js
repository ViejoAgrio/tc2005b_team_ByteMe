const np = require('../models/cliente-empresa.model.js');

module.exports.render_clienteEmpresa = async (req, res) => {
    try {
        const objCliente = new np.Cliente();
        const clientesTable = await objCliente.get_Cliente();

        const objEmpresa = new np.Empresa();
        const empresasTable = await objEmpresa.get_Empresa();
        res.render('admin/cliente-empresa', 
            { 
                clientesTable: JSON.stringify(clientesTable),
                empresasTable: JSON.stringify(empresasTable) 
            }
        );
    } catch (error) {
        console.error('Error al obtener cliente-empresa:', error);
        res.status(500).send('Error al obtener cliente-empresa');
    }
};

module.exports.get_cliente = async (req, res) => {
    try {
        const objCliente = new np.Cliente();
        const clientesTable = await objCliente.get_Cliente();
        res.json(clientesTable);
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        res.status(500).send('Error al obtener cliente');
    }
};

module.exports.add_cliente = async (req, res) => {
    try {
        const { nuevoNombre } = req.body;
        const objCliente = new np.Cliente();
        await objCliente.add(nuevoNombre);
        const clientesTable = await objCliente.get_Cliente();
        res.redirect('/admin/cliente-empresa');
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        res.status(500).send('Error al agregar cliente');
    }
};

module.exports.get_empresa = async (req, res) => {
    try {
        const objEmpresa = new np.Empresa();
        const empresasTable = await objEmpresa.get_Empresa();
        res.json(empresasTable);
    } catch (error) {
        console.error('Error al obtener empresa:', error);
        res.status(500).send('Error al obtener empresa');
    }
};

module.exports.add_empresa = async (req, res) => {
    try {
        const { newEmpresa } = req.body;
        const objEmpresa = new np.Empresa();
        await objEmpresa.add(newEmpresa);
        const empresasTable = await objEmpresa.get_Empresa();
        res.redirect('/admin/cliente-empresa');
    } catch (error) {
        console.error('Error al agregar empresa:', error);
        res.status(500).send('Error al agregar empresa');
    }
};