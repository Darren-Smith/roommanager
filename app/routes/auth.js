const authController = require('../controllers/authController.js');
const userCRUD = require('../config/userCRUD.js');
const {isAdmin, isLoggedIn} = require('./middleware');
module.exports = function(app, passport) {
    // app.get('/register',  authController.register); //isLoggedIn, isAdmin,
    
    // app.post('/register', passport.authenticate('local-register', {
    //     successRedirect: '/login',
    //     failureRedirect: '/register'
    // }));

    app.post('/register', isLoggedIn, isAdmin, async function(req, res){
        const {username, password, isAdmin=false} = req.body.newUserDetails
        const registrationDetailsofNewUser = {username, password, isAdmin}
        const foundUser = await userCRUD.findOneByUsername(registrationDetailsofNewUser.username);
        if (foundUser) {
            let message ='That username is already taken';
            console.log(foundUser);
            return false, message;
        } else {
            await userCRUD.create(registrationDetailsofNewUser);
            res.redirect('./admin');
        };
    });
    
    app.get('/login', authController.login);
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    app.get('/dashboard',isLoggedIn, authController.dashboard);
    
    app.get('/admin', isLoggedIn, isAdmin, authController.admin);
   
    app.get('/logout',authController.logout);

    
};