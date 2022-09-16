const userCRUD = require('../config/userCRUD.js');

var exports = module.exports = {};
// exports.register = function(req, res) {
//     res.render('register', {title: 'Register', user: req.user});
// };

exports.login = function(req, res) {
    res.render('login', {title: 'RoomManager', user: req.user});
};

exports.dashboard = function(req, res) {
    res.render('dashboard', {title: 'Dashboard', user:req.user});
};

exports.admin = async function(req, res) {
    const allUsers = await userCRUD.getAll();
    res.render('admin', {title: 'Admin', user:req.user, allUsers});
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/login');
    });
}