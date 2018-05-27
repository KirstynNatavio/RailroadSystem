const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');

module.exports = {
  registerRouter() {
    const router  = express.Router();
    router.get('/', this.index);
    router.post('/', this.newReservation);
    return router;
  },
  index(req, res) {
    // models.STATION.findAll({
    //   attributes: ['STATION_ID', 'CITY', 'STATE']
    // }).then((allStations) => {
    //   res.send(allStations);

    // })
    res.render('dashboard');

  },
  newReservation(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
    const origin = req.body.origin;
    const reservationDate = req.body.date;
    const destination = req.body.destination;
    const numberOfPets = req.body.pets;
    const paymentMethod = req.body.paymentMethod;
    const disabled = req.body.disabled;
    const veteran = req.body.veteran;
    const adultFare = req.body.adultFare;
    const childFare = req.body.childFare;
    const elderlyFare = req.body.elderlyFare;
    var passengerId = null;
    var trainId = null;
    const currentDate = Date.now();

  }

}


/* CREATE */

                 
                       
                      //Set veteran/military variables to bits for yes/no
                      //These bits will be used to compute the GET_PRICE procedure in the database
//                     (disabled.toLowerCase() == 'yes') ? disabled = 1 : disabled = 0;
//                    (veteran.toLowerCase() == 'yes') ? veteran = 1 : veteran = 0;
                
                       
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
                       
//                      var replacements = [
//                            origin,
//                            destination,
//                            disabled,
//                            veteran,
//                            numberOfPets,
//                            currentDate,
//                            reservationDate
//                      ];
    
                      //Call GET_PRICE with sequelize.query and pass in relevant info
//                      sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE_OF_FARE);', { 
//                              replacements: replacements, 
//                              type: sequelize.QueryTypes.SELECT 
                          
//                      }).then(projects => {
//                          console.log(projects);
//                        });
                        
                        
                      /* Passing information to relevant database tables */
                      
//                      models.PASSENGER.create({
//                          FIRST_NAME:       firstName,
//                          LAST_NAME:        lastName,
//                          EMAIL:            email,
//                          PHONE_NUMBER:     phone,
//                      });
                      
                      /* Select passenger id to be able to insert values into the reservation and trip tables.
                         The result of the query is passed as "result."
                      */
//                      sequelize.query("SELECT PASSENGER_ID FROM PASSENGER WHERE EMAIL='?' AND LAST_NAME='?'", {
//                          replacements: [email, lastName],
//                          type: sequelize.QueryTypes.SELECT 
//                      }).spread((result) => {
//                            passengerId = result;
//                            models.RESERVATION.create({
//                                  PASSENGER_ID:     result,   
//                                  RES_DATE:         reservationDate,
//                                  PAYMENT_METHOD:   paymentMethod 
//                            });
//                      });
                      
                      /* Select reservation id to insert information into the TRIP table */
//                      sequelize.query("SELECT RESERVATION_ID FROM RESERVATION WHERE PASSENGER_ID='?'", {
//                          replacements: [passengerId],
//                          type: sequelize.QueryTypes.SELECT
//                      }).spread((result) => {
//                            models.TRIP.create({
//                                  TRAIN_ID:         trainId,
//                                  RESERVATION_ID:   result,
//                                  PASSENGER_ID:     passengerId,
//                                  ORIGIN:           origin,
//                                  DESTINATION:      destination,
//                                  TRIP_DATE:        reservationDate
//                            });
//                          
//                      });
                       
                     
                     
//});               


//module.exports = router;
