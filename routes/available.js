const   Sequelize       = require('sequelize'),
        models          = require('../models'),
        express         = require('express'),
        moment          = require('moment');
    
var router              = express.Router();

var passengerId,
    reservationId,
    origin_id,
    destination_id,
    reservationDate,
    timeday,
    trip_price;
    
    


var exphbs = require('express-handlebars');
var app = express();
var hbs = exphbs.create({
  helpers: {
    eachInMap: function(map, block) {
      var out = '';
      Object.keys( map ).map(function( prop ) {
        out += block.fn( {key: prop, value: map[ prop ]} );
      });
      return out;
    }
  }
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



   

var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
                });

router.post('/available', function(req, res){
    
                  reservationDate     = req.body.date;
                  timeday             = req.body.timeday;
                  
                 reservationDate = new Date(reservationDate);
                 var reservationMoment = moment(reservationDate);
                 reservationMoment = reservationMoment.format('YYYY-MM-DD');
                 reservationDate = reservationMoment;
                  
  
        const     firstName           = req.body.firstName,
                  lastName            = req.body.lastName,
                  phone               = req.body.phone,
                  email               = req.body.email,
                  date                = req.body.date,
                  origin              = req.body.origin,
                  destination         = req.body.destination,
                  fare                = req.body.fare,
                  numberOfPets        = parseInt(req.body.pets),
                  paymentMethod       = req.body.paymentMethod,
                  currentDate         = moment().format('YYYY-MM-DD');
                  
  
                  
                 
        var       trainId,
                  age                 = null,
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
                 
                  

            }, 500);
            
                setTimeout(function(){
                         models.PASSENGER.create({
                                FIRST_NAME: firstName,
                                LAST_NAME: lastName,
                                PHONE_NUMBER: phone,
                                EMAIL: email
                         }).then(passenger => {
                                passengerId = passenger.dataValues.PASSENGER_ID;
                    
                     /* Select passenger id to be able to insert values into the reservation and trip tables.
                         The result of the query is passed as "result."
                    */
                        
                           
                          models.RESERVATION.create({
                                PASSENGER_ID:     passengerId,   
                                RES_DATE:         reservationDate,
                                PAYMENT_METHOD:   paymentMethod 
                          }).then(reservation => {
                                reservationId = reservation.dataValues.RESERVATION_ID;
                          });
          
                          
                     });
                }, 1000);
                
            
          
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
        							 			    if(train1 != 0){
        							 			        arrival1 = Object.values(arrival[0])[0];;
        							 			    }
        							 			
        							 			});
                                     });
                                     
                                     sequelize.query('SELECT @TRAIN2;').then(train => {
                                            train2 = Object.values(train[0][0])[0];
                                           
                                          
                                    }).then(train => {
                                            sequelize.query("SELECT ARRIVAL FROM STOPS_AT WHERE STATION_ID=? AND TRAIN_ID=?", {
													replacements: [origin_id, train2],
													type: sequelize.QueryTypes.SELECT 
												}).then(arrival => {
												    if(train2 != 0){
    													arrival2 = Object.values(arrival[0])[0];
												    }
												});
                                     });
                                     
                                     sequelize.query('SELECT @TRAIN3;').then(train => {
                                           
                                            train3 = Object.values(train[0][0])[0];
                                          
                                     }).then(train => {
                                                    
                                                sequelize.query("SELECT ARRIVAL FROM STOPS_AT WHERE STATION_ID=? AND TRAIN_ID=?;", {
    													replacements: [origin_id, train3],
    													type: sequelize.QueryTypes.SELECT 
    												}).then(arrival => {
    												        if(train3 != 0){
    											            	arrival3 = Object.values(arrival[0])[0];
    											            	
    												        } 
    												
    												});

                                     });

							
                                });
                                
                                setTimeout(() => {

                                        var train_arrivals = [];
                                        var firstTrain = {
                                          number: train1,
                                          arrival: arrival1
                                        };
                                        var secondTrain = {
                                          number: train2,
                                          arrival: arrival2
                                        };
                                        var thirdTrain = {
                                          number: train3,
                                          arrival: arrival3
                                        }

                                                                               
                                        if(train1 != 0 && train1 != null){
                                          train_arrivals.push(firstTrain);
                                        }
                                        
                                        if(train2 != 0 && train2 != null){
                                          train_arrivals.push(secondTrain);
                                        }
                                        
                                        if(train3 != 0 && train3 != null){
                                          train_arrivals.push(thirdTrain);
                                        }
                        
                                        var empty = false;
                                        if (train_arrivals.length == 0) {
                                          empty = true;
                                        }
                                        
                                        var options = {
                                            passengerId: passengerId,
                                            origin_id: origin_id,
                                            destination_id: destination_id,
                                            reservationDate: reservationDate,
                                            reservationId: reservationId,
                                            timeday: train_timeday,
                                            trip_price: trip_price
                                        };
                                   
                                        module.exports = options;
                                        
                                        res.render('available', {train_arrivals, empty}); 
                                }, 2000);
                              
                 			    
                }, 1500);
                              

            

});


// router.post('/availableConfirm', function(req, res){
    

   
//   res.render('reservation'); 
// });


module.exports = router;
