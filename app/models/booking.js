const User = require('./user');
module.exports = function(sequelize, Sequelize) {
    var Booking = sequelize.define('booking', {
        booking_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        guest1_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        guest2_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        guest3_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        guest4_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        group_name:{
            type: Sequelize.ENUM,
            values:["Arts","be","replaced"],
            allowNull: false
        },
        room: {
            type: Sequelize.ENUM,
            values:["to","be","replaced","4"],
            allowNull: false
        },
        first_night: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        last_night: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING,
            allowNull: true
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }

    });
    Booking.associate = (User) => {
        Booking.belongsTo(User, {foreignKey: 'user_id'})
    };

    return Booking;
}