const models            = require("../models"),
      express           = require('express'),
      available         = require('./available.js'),
      
      options           = available,
      passengerId       = options.passengerId,
      reservationId     = options.reservationId,
      origin_id         = options.origin_id,
      destination_id    = options.destination_id,
      reservationDate   = options.reservationDate,
      timeday           = options.timeday,
      trip_price        = options.trip_price;
      
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
                            }).then(trip => {
                                console.log(trip);
                            });
  
    setTimeout(() => {
        res.render('availableConfirm');  
    }, 1000);
          
        
});







module.exports = router;


