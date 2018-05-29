const models            = require("../models"),
      express           = require('express'),
      available         = require('./available.js'),
      options           = available.options,
      passengerId       = options[0],
      origin_id         = options[1],
      destination_id    = options[2],
      reservationDate   = options[3],
      reservationId     = options[4],
      timeday           = options[5],
      trip_price        = options[6];
      
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


