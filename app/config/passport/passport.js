const bCrypt = require('bcryptjs');
module.exports = function(passport, user) {
    //var User = user;
    const LocalStrategy = require('passport-local').Strategy;
    
    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    // deserialize user   
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    //Local Login
    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            const User = user;
            const isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                const userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Login'
                });
            });
        }
    ));
          
};