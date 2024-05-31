const db = require('../utils/database.js');
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

        // Recorrer cada objeto en el arreglo y actualizar las fechas
        resumed.forEach(proyecto => {
            proyecto.fechaInicio = formatearFecha(proyecto.fechaInicio);
            proyecto.fechaFinal = formatearFecha(proyecto.fechaFinal);
        });

        // Mostrar los proyectos con fechas formateadas
        console.log('Id del proyecto obtenido de la base de datos:', resumed);

        const hidden = await newUser.saveHidden();

        console.log('Id del proyecto obtenido de la base de datos:', hidden);

        res.render("admin/admin", {
            resumedProyects: resumed,
            hidden: hidden
        });

    } catch (error) {
        console.error('Error al obtener el id_proyect de la base de datos:', error);
        res.status(500).send('Error al obtener el id_proyect de la base de datos');
    }
};