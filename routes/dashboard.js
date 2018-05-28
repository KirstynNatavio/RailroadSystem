const models        = require("../models"),
      express       = require('express'),
      Sequelize     = require('sequelize');
var router = express.Router();
var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                 host: 'localhost',
                 dialect: 'mysql',
                 port: 3306
         });

router.get('/', function(req, res, next) {
  models.STATION.findAll({
  }).then((allStations) => {
    res.render('dashboard', {allStations});
  })      
        
});

router.post('/', function(req, res){
  
     const firstName           = req.body.firstName,
                  lastName            = req.body.lastName,
                  phone               = req.body.phone,
                  email               = req.body.email,
                  date                = req.body.date,
                  origin              = req.body.origin,
                  reservationDate     = req.body.date,
                  destination         = req.body.destination,
                  numberOfPets        = req.body.pets,
                  paymentMethod       = req.body.paymentMethod,
              
                  fare                = req.body.fare,
                  timeday             = req.body.timeday,
                  currentDate         = Date.now();
                  
          var passengerId             = null,
                  trainId             = null,
                  age                 = null,
                  disabled            = req.body.disabled,
                  veteran             = req.body.veteran,
                  time                = req.body.time;
                  
                  
                                   console.log(disabled);
                                   console.log(veteran);
                                   console.log(fare);
                              
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
                  
                  
            var replacements = [
                             origin,
                             destination,
                             disabled,
                             veteran,
                             age,
                             numberOfPets,
                             currentDate,
                             reservationDate
               ];
              
               //Call GET_PRICE with sequelize.query and pass in relevant info
             sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE_OF_FARE);', { 
                     replacements: replacements, 
                     type: sequelize.QueryTypes.SELECT 
            
             }).then(projects => {
                  console.log("-----------PROJECTS:---------")
                 console.log(projects);
               });
               
            sequelize.query('select @PRICE_OF_FARE').then(price => {
                  console.log(price);
            })
      
                models.PASSENGER.create({
                    FIRST_NAME: firstName,
                    LAST_NAME: lastName,
                    PHONE_NUMBER: phone,
                    EMAIL: email
                }).then(passenger => {
                    
                    
                     /* Select passenger id to be able to insert values into the reservation and trip tables.
                         The result of the query is passed as "result."
                    */
                      console.log(passenger);
                           
                          models.RESERVATION.create({
                                PASSENGER_ID:     passenger.dataValues.PASSENGER_ID,   
                                RES_DATE:         reservationDate,
                                PAYMENT_METHOD:   paymentMethod 
                          }).then(reservation => {
                            
                              models.TRIP.create({
                                   TRAIN_ID:         trainId,
                                   RESERVATION_ID:   reservation.dataValues.RESERVATION_ID,
                                   PASSENGER_ID:     passengerId,
                                   ORIGIN:           origin,
                                   DESTINATION:      destination,
                                   TRIP_DATE:        reservationDate,
                                   TRIP_TIME:        time,
                                   PRICE:            price
                             });
                            
                          });
                          
                     });

        
    
    res.render('dashboard');
});

module.exports = router;

//module.exports = router;
  
     
                  
          
            
            
//             (disabled.toLowerCase() == 'yes') ? disabled = 1 : disabled = 0;
//             (veteran.toLowerCase() == 'yes') ? veteran = 1 : veteran = 0;
            
//             sequelize.query('SELECT * FROM TRAIN', {
//                             model: models.TRAIN
//                     }).then(projects => {
//                             // Each record will now be a instance of Projec
//                             res.send(JSON.stringify(projects));
//                     });
                    

                         
//                         //ORIGIN
//                         //DEST
//                         //TIME OF DAY MOR, EVE, AFT
//                         //DATE
//                       sequelize.query('call GET_AVAILABLE_TRAINS(?, ?, ?, ?, @TRAIN1, @TRAIN2, @TRAIN);', {
//                             replacements: [origin, destination, timeday, date],
//                             type: sequelize.QueryTypes.SELECT 
                            
//                       }).then(availableTrains => {
//                             res.render('index', {availableTrains: availableTrains})
//                       });
              
              
// });



/* CREATE */

                 

                       
//                       var replacements = [
//                             origin,
//                             destination,
//                             disabled,
//                             veteran,
//                             numberOfPets,
//                             currentDate,
//                             reservationDate
//                       ];
    
//                       //Call GET_PRICE with sequelize.query and pass in relevant info
//                       sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE_OF_FARE);', { 
//                               replacements: replacements, 
//                               type: sequelize.QueryTypes.SELECT 
                          
//                       }).then(projects => {
//                           console.log(projects);
//                         });
                        
//                       sequelize.query('call GET_AVAILABLE_TRAINS(?, ?, ?, ?, @TRAIN1, @TRAIN2, @TRAIN3);', {
//                           replacements: [];
//                       })
                      
//                       var trains = []
//                       sequelize.query('select @TRAIN1;').spread((result) => {
                                
//                       })
                        
                        
//                       /* Passing information to relevant database tables */
                      

                      

                      

                       
                     
                     
// });               


//module.exports = router;
