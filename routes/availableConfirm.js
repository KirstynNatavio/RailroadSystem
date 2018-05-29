const models            = require("../models"),
      express           = require('express');
    
      
var router = express.Router();


var Sequelize = require('sequelize');
var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
});

router.post('/', function(req, res, next) {
    
 const     available         = require('./available.js'),
           options           = available,
              passengerId       = options.passengerId,
              reservationId     = options.reservationId,
              origin_id         = options.origin_id,
              destination_id    = options.destination_id,
              reservationDate   = options.reservationDate,
              timeday           = options.timeday,
              trip_price        = options.trip_price;
var tripId;
            
   
        var train_w_arrival = req.body.available.split('-');
        var trainId = train_w_arrival[0];
        var arrivalTime = train_w_arrival[1];
        
       
        console.log('TRAIN ID: ' + trainId);
        console.log('ARRIVAL TIME: ' + arrivalTime);
        //create trip
                         models.TRIP.create({
                                  TRAIN_ID:         trainId,
                                  RESERVATION_ID:   reservationId,
                                  PASSENGER_ID:     passengerId,
                                  ORIGIN:           origin_id,
                                  DESTINATION:      destination_id,
                                  TRIP_DATE:        reservationDate,
                                  TRIP_TIME:        arrivalTime,
                                  PRICE:            trip_price
                            }).then(trip => {
                                tripId = trip;
                                
                                sequelize.query('call OCCUPY_FREE_SEAT(?,?,?,?);', {
                                    replacements: [origin_id, destination_id, trainId, reservationDate]
                                });
                            });
  
    setTimeout(() => {
        res.render('availableConfirm', {reservationId: reservationId});  
    }, 1000);
          
        
});







module.exports = router;


