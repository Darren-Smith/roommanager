
const Booking = require('./booking');
module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('user', {
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }

    });
    User.associate = (Booking) => {
        User.hasMany(Booking, {foreignKey: 'booking_id'})
    };
    return User;
}