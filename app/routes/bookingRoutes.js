const bookingController = require('../controllers/bookingController.js');
const bookingCRUD = require('../config/bookingCRUD.js');
const {isAdmin, isLoggedIn} = require('./middleware');
const express = require('express');
const router = express.Router();

router.get('/', isLoggedIn, bookingController.allBookings);

router.get('/:bookingId/showBooking', isLoggedIn, bookingController.showBooking);



router.get('/addBooking', isLoggedIn, bookingController.addBooking);

router.post('/addBooking', isLoggedIn, async function(req, res){
    const {
        guest1_name, 
        guest2_name, 
        guest3_name, 
        guest4_name, 
        group_name,
        room,
        first_night,
        last_night,
        notes} = req.body.newBooking;
    const detailsofNewBooking = {guest1_name, 
        guest2_name, 
        guest3_name, 
        guest4_name, 
        group_name,
        room,
        first_night,
        last_night,
        notes};
    
        await bookingCRUD.createBooking(detailsofNewBooking);
        res.redirect('/bookings/');
    });


module.exports = router;