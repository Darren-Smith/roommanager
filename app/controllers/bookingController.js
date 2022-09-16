const bookingCRUD = require('../config/bookingCRUD.js');

var exports = module.exports = {};
// exports.register = function(req, res) {
//     res.render('register', {title: 'Register', user: req.user});
// };

exports.addBooking = function(req, res) {
    res.render('./bookings/addBooking', {title: 'Add a Booking', user: req.user});
};

exports.editBooking = function(req, res) {
    res.render('./bookings/editBooking', {title: 'Edit a Booking', user:req.user});
};
exports.showBooking = async function(req, res) {
    const booking = await bookingCRUD.findOneByBookingID(req.params.bookingId);
    res.render('./bookings/showBooking', {title: 'Booking detail', user:req.user, booking});
};

exports.allBookings = async function(req, res) {
    const allBookings = await bookingCRUD.getAllBookings();
    res.render('./bookings/index', {title: 'Bookings', user: req.user, allBookings});
};

exports.deleteBooking = function(req, res) {
    //destroy booking or mark as inactive
    res.redirect('./bookings/index');
}