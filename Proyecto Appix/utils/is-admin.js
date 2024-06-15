module.exports = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.roles === 'Admin') {
        return next();
    } else {
        res.redirect('/login');
    }
}
