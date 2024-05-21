module.exports = (req, res, next) => {
    if (req.session.isLoggedIn && req.session.roles === 'User') {
        return next();
    } else {
        res.redirect('/login');
    }
}