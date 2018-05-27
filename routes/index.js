var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* CREATE */
router.post('/', function(req, res){

                   var origin       = req.body.origin;
                   var destination  = req.body.destination;
                   var date         = req.body.date;
                   var numberOfPets = req.body.pets;
                   var adultFare    = req.body.adultFare;
                   var childFare    = req.body.childFare;
                   var elderlyFare  = req.body.elderlyFare;
                   

                   models.PASSENGER.create({
                       FIRST_NAME: req.body.firstName,
                       LAST_NAME: req.body.lastName,
                       EMAIL: req.body.email,
                       PHONE_NUMBER: req.body.phone,
                   });
                   
                   
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
