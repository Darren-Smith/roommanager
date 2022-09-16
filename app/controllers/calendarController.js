const bookingCRUD = require('../config/bookingCRUD.js');
const booking = require('../models/booking.js');

async function getCurrentAndFutureBookingsAsEvents() {
    const currentBookings = [];
    const allBookings = await bookingCRUD.getAllBookings();
    for (let booking of allBookings) {
        if (booking.last_night) {
            const event = {
                title: `${ booking.guest1_name } - ${ booking.group_name } - ${ booking.room }`,
                start: booking.first_night,
                //url: url,
                end: booking.last_night
            }
            // console.log(currentBookings);
            currentBookings.push(event);
        }
    }
    return currentBookings;
}
var exports = module.exports = {};
exports.showCalendar = async function (req, res) {
        
    const currentBookings = await getCurrentAndFutureBookingsAsEvents();
    //console.log(currentBookings);

    res.render('./calendar', { title: 'Calendar', user: req.user, events: currentBookings });

};



