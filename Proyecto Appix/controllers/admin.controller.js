const User = require('../models/admin.model.js');
const bcrypt = require('bcryptjs');

module.exports.render_admin = async (req, res) => {
    try {

        const newUser = new User(1);
        const resumed = await newUser.saveResumed();
        
        function formatearFecha(fechaISO) {
            const fecha = new Date(fechaISO); // Crear objeto Date a partir de la cadena ISO 8601
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1; // Meses son indexados desde 0 (enero) hasta 11 (diciembre)
            const anio = fecha.getFullYear();
            return `${dia < 10 ? '0' + dia : dia} / ${mes < 10 ? '0' + mes : mes} / ${anio}`;
          }
          
        resumed.forEach(proyecto => {
            proyecto.fechaInicio = formatearFecha(proyecto.fechaInicio);
            proyecto.fechaFinal = formatearFecha(proyecto.fechaFinal);
          });
        
        const empresas = await newUser.saveEmpresas();

        res.render("admin/admin", {
            resumedProyects: resumed,
            empresas: empresas
        });

    } catch (error) {
        console.error('Error al obtener registro de la base de datos:', error);
        res.status(500).send('Error al obtener registro de la base de datos');
    }
};


module.exports.render_nuevo_proyecto = async(req,res) =>{
    res.render('admin/nuevo-proyecto');
}

module.exports.render_change_password = async(req, res) => {
    res.render('admin/change-password');
}

module.exports.post_change_password = async (req, res) => {
    const { username, newPassword, confirmedPassword } = req.body;

    if (newPassword !== confirmedPassword) {
        return res.status(400).json({ message: 'La contraseña no coincide' });
    }

    try {
        const user = await User.findUser(username);
        
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
    
        await User.newPassword(username, newPassword);
        return res.status(200).json({ message: 'La contraseña ha sido cambiada' });
    } catch (err) {
        console.error('Error changing password:', err);
        return res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};