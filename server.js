// const fs = require('fs');
// const https = require('https');
// const key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
// const cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt');
// const options = {
//   key: key,
//   cert: cert
// };

var env = require('dotenv').config();
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var Sequelize = require("sequelize");
var envStage = process.env.NODE_ENV || "development";
var config = require('./app/config/config.json')[envStage];
var sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    dialectOptions: {
        // mariadb options here
        // connectTimeout: 1000
      }
  });
const SessionStore = require('express-session-sequelize')( session.Store );
const sequelSessionStore = new SessionStore ({ db: sequelize });
app.use(express.urlencoded({
    extended: true
    })
);
app.use(express.json());

// session secret
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true, 
    saveUninitialized:true,
    store: sequelSessionStore
})); 

// For Passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('views', path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'app/public')));

//Models
var models = require("./app/models");

//Routes
app.get('/', function (req, res) {
    res.redirect('/login');
});
const authRoute = require('./app/routes/auth.js')(app, passport);
const bookingRoutes = require('./app/routes/bookingRoutes.js');
const calendarRoutes = require('./app/routes/calendarRoutes.js');
const reportRoutes = require('./app/routes/reportRoutes.js');

// app.use(authRoute);
app.use('/bookings', bookingRoutes);
app.use('/calendar', calendarRoutes);
app.use('/reports', reportRoutes);

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});
 
//Listen
// var server = https.createServer(options, app);

// server.listen(port, () => {
//     console.log(`Server listening on http://localhost:${PORT} ...`);
// });

app.listen(PORT, function (err) {
    if (!err)
        console.log(`Server listening on http://localhost:${PORT} ...`);
    else console.log(err)
});