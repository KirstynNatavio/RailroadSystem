var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* CREATE */
router.post('/', function(req, res){
    
                   var firstName    = req.body.firstName;
                   var lastName     = req.body.lastName;
                   var email        = req.body.email;
                   var phone        = req.body.phone;
                   var origin       = req.body.origin;
                   var destination  = req.body.destination;
                   var date         = req.body.date;
                   var numberOfPets = req.body.pets;
                   var adultFare    = req.body.adultFare;
                   var childFare    = req.body.childFare;
                   var elderlyFare  = req.body.elderlyFare;
                   
                
                   
});

module.exports = router;
