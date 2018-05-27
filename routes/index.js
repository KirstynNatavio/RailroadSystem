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

                //   var firstName    = req.body.firstName,
                //       lastName     = req.body.lastName,
                //       phone        = req.body.phone,
                //       email        = req.body.email,
                //       origin       = req.body.origin,
                //       destination  = req.body.destination
                //       numberOfPets = req.body.pets,
                //       disabled     = req.body.disabled,
                //       veteran      = req.body.veteran,
                //       adultFare    = req.body.adultFare,
                //       childFare    = req.body.childFare,
                //       elderlyFare  = req.body.elderlyFare;
                       
                //       //Set veteran/military variables to bits for yes/no
                //       //These bits will be used to compute the GET_PRICE procedure in the database
                //       (disabled.toLowerCase() == 'yes') ? disabled = 1 : disabled = 0;
                //       (veteran.toLowerCase() == 'yes') ? veteran = 1 : veteran = 0;
                //       (adultFare.toLowerCase() == 'adultFare') ? adultFare = 1 : adultFare =
                       
                //       /* GET_PRICE parameters: */
                       
                //       /*  IN ORIGIN INT(11), 
                //           IN DEST INT(11), 
                //           IN DIS_BIN BIT, 
                //           IN MILIT_BIN BIT, 
                //           IN AGE INT(1), 
                //           IN PET_NUM INT, 
                //           IN TRIP_DATE DATE, 
                //           IN RES_DATE DATE, 
                //           OUT PRICE DOUBLE(6,2))
                //       */
                       
                //       var replacements = [
                //             origin,
                //             destination,
                //             disabled,
                //             veteran,
                            
                           
                //       ]
    
                //       //Call GET_PRICE with sequelize.query and pass in relevant info
                //       sequelize.query('call GET_PRICE(?, ?, ?, ?, ?, ?, ?, ?, @PRICE_OF_FARE);', { 
                //           replacements: [origin, destination, , ,  ], 
                //           type: sequelize.QueryTypes.SELECT }
                //         ).then(projects => {
                //           console.log(projects)
                //         })
                        
                        
                //   models.PASSENGER.create({
                //       FIRST_NAME: firstName,
                //       LAST_NAME: lastName,
                //       EMAIL: email,
                //       PHONE_NUMBER: phone,
                //   });
                   
                //   models.TRIP.create({
                //       ORIGIN: origin,
                //       DESTINATION:,
                //       TRIP_DATE: req.body.date
                       
                //   });
                   
                //   models.RESERVATION.create({
                //       PAYMENT_METHOD: req.body.paymentMethod 
                //   });
                   
                   
});               

                   
                   
//                   User.create({ username: 'fnord', job: 'omnomnom' })
//                       .then(() => User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))
//                       .spread((user, created) => {
//                         console.log(user.get({
//                           plain: true
//                         }))
//                     console.log(created);

                   
// });

module.exports = router;
