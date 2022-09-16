var exports = module.exports = {};

exports.showReports = function(req, res) {
    res.render('./reports', {title: 'Reports', user: req.user});
};