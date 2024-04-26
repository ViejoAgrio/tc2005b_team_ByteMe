/* Controlador para manejar el envío del formulario de inicio de sesión (POST)
exports.submitLoginForm = (req, res) => {
    const { usuario, contrasena } = req.body;

    // Verifica las credenciales del usuario
    if (usuario === 'admin' && contrasena === 'admin') {
        // Si es un administrador, redirige a la interfaz de administrador
        res.redirect('admin');
    } else {
        // Si las credenciales son incorrectas, vuelve a renderizar el formulario de inicio de sesión con un mensaje de error
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
};

module.exports.do_login = async(req, res) =>{
    res.status(200)
}

*/

