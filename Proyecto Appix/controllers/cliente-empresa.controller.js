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

module.exports.update_cliente = async (req, res) => {
    try {
        const { idCliente, nombreEncargado } = req.body;
        const objCliente = new np.Cliente(idCliente, nombreEncargado);
        console.log('obejto cliente', objCliente);
        await objCliente.update(idCliente, nombreEncargado);
        const updatedCliente = await objCliente.get_ById(idCliente);
        console.log('Cliente actualizadooooo', updatedCliente);
        res.json({ cliente: updatedCliente [0] });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).send('Error al actualizar cliente');
    }
};

module.exports.delete_cliente = async (req, res) => {
    try {
        const { idCliente } = req.body;
        const objCliente = new np.Cliente();
        await objCliente.delete(idCliente);
        const clientesTable = await objCliente.get_Cliente();
        res.redirect('/admin/cliente-empresa');
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).send('Error al eliminar cliente');
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

module.exports.update_empresa = async (req, res) => {
    try {
        const { idEmpresa, nombreEmpresa } = req.body;
        const objEmpresa = new np.Empresa(idEmpresa, nombreEmpresa);
        console.log('obejto empresa', objEmpresa);
        await objEmpresa.update(idEmpresa, nombreEmpresa);
        const updatedEmpresa = await objEmpresa.get_ById(idEmpresa);
        console.log('Empresa actualizadooooo', updatedEmpresa);
        res.json({ empresa: updatedEmpresa[0] });
    } catch (error) {
        console.error('Error al actualizar empresa:', error);
        res.status(500).send('Error al actualizar empresa');
    }
};

module.exports.delete_empresa = async (req, res) => {
    try {
        const { idEmpresa } = req.body;
        const objEmpresa = new np.Empresa();
        await objEmpresa.delete(idEmpresa);
        const empresaTable = await objEmpresa.get_Empresa();
        res.redirect('/admin/cliente-empresa');
    } catch (error) {
        console.error('Error al eliminar empresa:', error);
        res.status(500).send('Error al eliminar empresa');
    }
};