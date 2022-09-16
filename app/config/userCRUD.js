const bCrypt = require('bcryptjs');
const env = process.env.NODE_ENV || "development";
const { Sequelize, Model, DataTypes } = require("sequelize");
const path = require('path');
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const User = require('../models/user')(sequelize, Sequelize);


async function create(registrationDetailsofNewUser) {
    const generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    
    const hashedPassword = generateHash(registrationDetailsofNewUser.password);
    const data = {
            username: registrationDetailsofNewUser.username,
            password: hashedPassword,
            isAdmin: registrationDetailsofNewUser.isAdmin
        };
    User.create(data).then(function(newUser, created) {
        if (!newUser) {
            message ='Something went wrong when creating a new user';
            console.log(message);
            return false, message;
        }
        if (newUser) {
            //User.sync({ force: true });
            message = 'Success';
            console.log(message);
            return newUser. message;
        }
    });
};   

async function findOneByUsername(queryUsername){
    const foundUser =  User.findOne({ where: {username: queryUsername}});
    if (!foundUser){
        return false;
    } else {
        return foundUser;
    }
};

async function getAll(){
    const allUsers = User.findAll();
    return allUsers;
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
    getAll,
    // getById,
    create,
    findOneByUsername
    // ,update,
    // delete: _delete
};
