const model = require("../models/usuarios.model.js");
const bcrypt = require('bcryptjs');

module.exports.render_admin = async(req,res) =>{
    res.render('admin/admin');
}

module.exports.render_nuevo_proyecto = async(req,res) =>{
    res.render('admin/nuevo-proyecto');
}