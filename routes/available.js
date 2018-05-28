const   Sequelize       = require('sequelize'),
        models          = require('../models'),
        express         = require('express'),
        moment        = require('moment');
    
var router              = express.Router();
    
var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
                });

router.post('/available', function(req, res){
  
     const        firstName           = req.body.firstName,
                  lastName            = req.body.lastName,
                  phone               = req.body.phone,
                  email               = req.body.email,
                  date                = req.body.date,
                  origin              = req.body.origin,
                  reservationDate     = req.body.date,
                  destination         = req.body.destination,
                  fare                = req.body.fare,
                  numberOfPets        = parseInt(req.body.pets),
                  paymentMethod       = req.body.paymentMethod,
                  timeday             = req.body.timeday,
                  currentDate         = moment().format('YYYY-MM-DD');
                  
  
                  
                  
    var           passengerId         = null,
                  trainId             = null,
                  age                 = null,
                  trip_price          = null,
                  disabled            = req.body.disabled,
                  veteran             = req.body.veteran,
                  train_timeday       = '',
                  time                = req.body.time;
                  
                 if(timeday == 'morning')       train_timeday = 'MOR';
                 if(timeday == 'afternoon')     train_timeday = 'AFT';
                 if(timeday == 'evening')       train_timeday = 'EVE';
            
                 
             
                  
                                   console.log(disabled);
                                   console.log(veteran);
                                   console.log(fare);
                                   console.log("timeDay = " + timeday);
                                   console.log("currDate = " + currentDate );
                              
                       //Set veteran/military variables to bits for yes/no
                       //These bits will be used to compute the GET_PRICE procedure in the database
                      (disabled ==  'disabled_yes') ? disabled = 1 : disabled = 0;
                      (veteran == 'veteran_yes') ? veteran = 1 : veteran = 0;
                      
                      if (fare == 'adult') age = 1;
                      else if (fare == 'child') age = 0;
                      else age = 2;
                       
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
                  
            var price;
            var inputOrigin = origin.split(",");
            console.log("inputOrigin = " + inputOrigin);
            var inputDestination = destination.split(",");
            console.log("inputDestination = " + inputDestination);
            var origin_id;
            var destination_id;
            
            
            models.STATION.findOne({
              where: {
                CITY: inputOrigin[0],
                STATE: inputOrigin[1]
              }
            }).then((originID) => {
              origin_id = originID.dataValues.STATION_ID;
            })

            models.STATION.findOne({
              where: {
                CITY: inputDestination[0],
                STATE: inputDestination[1]
              }
            }).then((destinationID) => {
              destination_id = destinationID.dataValues.STATION_ID;
            });

            
           
             setTimeout(function(){
                 
                     var replacements = [
                             origin_id,
                             destination_id,
                             disabled,
                             veteran,
                             age,
                             numberOfPets,
                             currentDate,
                             reservationDate,
                             price
                      ];
                        
                    //Call GET_PRICE with sequelize.query and pass in relevant info
                 sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE);', { 
                     replacements: replacements
        
                
                 }).then(price => {
                                 
                                 sequelize.query('SELECT @PRICE;').then(price => {
                                        trip_price = Object.values(price[0][0])[0];
                                 });
                 });
                 
                  

            }, 1000);
            
                setTimeout(function(){
                         models.PASSENGER.create({
                                FIRST_NAME: firstName,
                                LAST_NAME: lastName,
                                PHONE_NUMBER: phone,
                                EMAIL: email
                         }).then(passenger => {
                        
                    
                     /* Select passenger id to be able to insert values into the reservation and trip tables.
                         The result of the query is passed as "result."
                    */
                     
                           
                          models.RESERVATION.create({
                                PASSENGER_ID:     passenger.dataValues.PASSENGER_ID,   
                                RES_DATE:         reservationDate,
                                PAYMENT_METHOD:   paymentMethod 
                          }).then(reservation => {
                            
                            //   models.TRIP.create({
                            //       TRAIN_ID:         trainId,
                            //       RESERVATION_ID:   reservation.dataValues.RESERVATION_ID,
                            //       PASSENGER_ID:     passengerId,
                            //       ORIGIN:           origin_id,
                            //       DESTINATION:      destination_id,
                            //       TRIP_DATE:        reservationDate,
                            //       TRIP_TIME:        timeday,
                            //       PRICE:            trip_price
                            // });
                            
                          });
          
                          
                     });
                }, 2000);
                
            
          
                setTimeout(function(){
                    
                              var train1, train2, train3 = null;
                              var arrival1, arrival2, arrival3 = null;
                              var train_replacements = [
                                    origin_id,
                                    destination_id,
                                    train_timeday,
                                    date
                              ];    
                              

                              
                              sequelize.query('call GET_AVAILABLE_TRAINS(?, ?, ?, ?, @TRAIN1, @TRAIN2, @TRAIN3);', {
		                            replacements: train_replacements

		                     }).then(trains => {
                                     sequelize.query('SELECT @TRAIN1;').then(train => {
                                           train1 = Object.values(train[0][0])[0];
                                            
                                     }).then(train => {
                                            sequelize.query("SELECT ARRIVAL FROM STOPS_AT WHERE STATION_ID=? AND TRAIN_ID=?;", {
        							 				replacements: [origin_id, train1],
        											type: sequelize.QueryTypes.SELECT 
        							 			}).then(arrival => {
        							 				arrival1 = arrival;
        							 				console.log(Object.values(arrival1[0]));
        							 			});
                                     });
                                     
                                     sequelize.query('SELECT @TRAIN2;').then(train => {
                                            train2 = Object.values(train[0][0])[0];
                                           
                                          
                                    }).then(train => {
                                            sequelize.query("SELECT ARRIVAL FROM STOPS_AT WHERE STATION_ID=? AND TRAIN_ID=?", {
													replacements: [origin_id, train2],
													type: sequelize.QueryTypes.SELECT 
												}).then(arrival => {
													arrival2 = arrival;
													console.log(Object.values(arrival2[0]));
												});
                                     });
                                     
                                     sequelize.query('SELECT @TRAIN3;').then(train => {
                                            train3 = Object.values(train[0][0])[0];
                                          
                                     }).then(train => {
                                                sequelize.query("SELECT ARRIVAL FROM STOPS_AT WHERE STATION_ID=? AND TRAIN_ID=?;", {
    													replacements: [origin_id, train3],
    													type: sequelize.QueryTypes.SELECT 
    												}).then(arrival => {
    													arrival3 = arrival;
    													console.log(Object.values(arrival3[0]));
    												});

                                     });

							
                                });
                                
                 			    
                }, 3000);
                              

   res.render('available');          

});


module.exports = router;
