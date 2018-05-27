const models             = require("../models");
var express              = require('express'),
    router               = express.Router(),
    sequelize            = require('sequelize');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* CREATE */
router.post('/', function(req, res){

                  var firstName         = req.body.firstName,
                      lastName          = req.body.lastName,
                      phone             = req.body.phone,
                      email             = req.body.email,
                      origin            = req.body.origin,
                      reservationDate   = req.body.date,
                      destination       = req.body.destination,
                      numberOfPets      = req.body.pets,
                      paymentMethod     = req.body.paymentMethod,
                      disabled          = req.body.disabled,
                      veteran           = req.body.veteran,
                      adultFare         = req.body.adultFare,
                      childFare         = req.body.childFare,
                      elderlyFare       = req.body.elderlyFare,
                      passengerId       = null,
                      trainId           = null,
                      currentDate       = Date.now();
                       
                      //Set veteran/military variables to bits for yes/no
                      //These bits will be used to compute the GET_PRICE procedure in the database
                      (disabled.toLowerCase() == 'yes') ? disabled = 1 : disabled = 0;
                      (veteran.toLowerCase() == 'yes') ? veteran = 1 : veteran = 0;
                
                       
                      /* GET_PRICE parameters: */
                       
                      /*  IN ORIGIN INT(11), 
                          IN DEST INT(11), 
                          IN DIS_BIN BIT, 
                          IN MILIT_BIN BIT, 
                          IN AGE INT(1), 
                          IN PET_NUM INT, 
                          IN TRIP_DATE DATE, 
                          IN RES_DATE DATE, 
                          OUT PRICE DOUBLE(6,2))
                      */
                       
                      var replacements = [
                            origin,
                            destination,
                            disabled,
                            veteran,
                            numberOfPets,
                            currentDate,
                            reservationDate
                      ];
    
                      //Call GET_PRICE with sequelize.query and pass in relevant info
                      sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE_OF_FARE);', { 
                              replacements: replacements, 
                              type: sequelize.QueryTypes.SELECT 
                          
                      }).then(projects => {
                          console.log(projects);
                        });
                        
                        
                      /* Passing information to relevant database tables */
                      
                      models.PASSENGER.create({
                          FIRST_NAME:       firstName,
                          LAST_NAME:        lastName,
                          EMAIL:            email,
                          PHONE_NUMBER:     phone,
                      });
                      
                      /* Select passenger id to be able to insert values into the reservation and trip tables.
                         The result of the query is passed as "result."
                      */
                      sequelize.query("SELECT PASSENGER_ID FROM PASSENGER WHERE EMAIL='?' AND LAST_NAME='?'", {
                          replacements: [email, lastName],
                          type: sequelize.QueryTypes.SELECT 
                      }).spread((result) => {
                            passengerId = result;
                            models.RESERVATION.create({
                                  PASSENGER_ID:     result,   
                                  RES_DATE:         reservationDate,
                                  PAYMENT_METHOD:   paymentMethod 
                            });
                      });
                      
                      /* Select reservation id to insert information into the TRIP table */
                      sequelize.query("SELECT RESERVATION_ID FROM RESERVATION WHERE PASSENGER_ID='?'", {
                          replacements: [passengerId],
                          type: sequelize.QueryTypes.SELECT
                      }).spread((result) => {
                            models.TRIP.create({
                                  TRAIN_ID:         trainId,
                                  RESERVATION_ID:   result,
                                  PASSENGER_ID:     passengerId,
                                  ORIGIN:           origin,
                                  DESTINATION:      destination,
                                  TRIP_DATE:        reservationDate
                            });
                          
                      });
                       
                     
                     
});               


module.exports = router;
