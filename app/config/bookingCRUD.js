//const bCrypt = require('bcryptjs');
const env = process.env.NODE_ENV || "development";
const { Sequelize, Model, DataTypes } = require("sequelize");
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Booking = require('../models/booking')(sequelize, Sequelize);


async function createBooking(detailsofNewBooking) {

    const newBookingData = {
            guest1_name: detailsofNewBooking.guest1_name,
            guest2_name: detailsofNewBooking.guest2_name,
            guest3_name: detailsofNewBooking.guest3_name,
            guest4_name: detailsofNewBooking.guest4_name,
            group_name: detailsofNewBooking.group_name,
            room: detailsofNewBooking.room,
            first_night: detailsofNewBooking.first_night,
            last_night: detailsofNewBooking.last_night,
            notes: detailsofNewBooking.notes
        };
    Booking.create(newBookingData).then(function(newBooking, created) {
        if (!newBooking) {
            message ='Something went wrong when creating a new booking';
            console.log(message);
            return false, message;
        }
        if (newBooking) {
            // Booking.sync({ force: true });
            message = 'Success';
            console.log(message);
            return newBooking, message;
        }
    });
};   

async function findOneByBookingID(queryBookingID){
    const foundBooking =  Booking.findOne({ where: {booking_id: queryBookingID}});
    if (!foundBooking){
        return false;
    } else {
        return foundBooking;
    }
};

async function getAllBookings(){
    const allBookings = Booking.findAll();
    return allBookings;
};

// async function getById(id){

// };
// async function update (params){

// };

// async function _delete(id) {
//     const user = await getUser(id);
//     await user.destroy();
// };
module.exports = {
    getAllBookings,
    // getById,
    createBooking,
    findOneByBookingID
    // ,update,
    // delete: _delete
};
