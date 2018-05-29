const models            = require("../models");
const express           = require('express');
const available         = require('./available.js');
const passengerId       = available.passengerId;
const reservationId     = available.reservationId;
const origin_id         = available.origin_id;
const destination_id    = available.destination_id;
const reservationDate   = available.reservationDate;
const timeday           = available.timeday;
const trip_price        = available.trip_price;
      
var router = express.Router();
router.post('/', function(req, res, next) {
	        
        var trainId = req.body.available;
        //create trip
                         models.TRIP.create({
                                  TRAIN_ID:         trainId,
                                  RESERVATION_ID:   reservationId,
                                  PASSENGER_ID:     passengerId,
                                  ORIGIN:           origin_id,
                                  DESTINATION:      destination_id,
                                  TRIP_DATE:        reservationDate,
                                  TRIP_TIME:        timeday,
                                  PRICE:            trip_price
                            });
  
    setTimeout(() => {
        res.render('availableConfirm');  
    }, 1000);
          
        
});







module.exports = router;


