const   Sequelize       = require('sequelize'),
        models          = require('../models'),
        express         = require('express'),
        dashboard       = require('./dashboard.js'),
        options         = dashboard.options,
        origin          = options.origin,
        destination     = options.destination,
        train_timeday   = options.train_timeday,
        date            = options.date;
    
var router              = express.Router();
    
var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
                });

router.get('/availableTrains', function(req, res){
      
      availableTrains();
      
      
      function availableTrains(){
          
                
                              var train1, train2, train3 = null;
                                
                              var train_replacements = [
                                    origin,
                                    destination,
                                    train_timeday,
                                    date
                              ];    
                              
                              console.log(train_replacements);
                              
                              sequelize.query('call GET_AVAILABLE_TRAINS(?, ?, ?, ?, @TRAIN1, @TRAIN2, @TRAIN3);', {
		                            replacements: train_replacements

		                     }).then(trains => {
                                 
                                 sequelize.query('SELECT @TRAIN1;').then(train => {
                                        console.log(train);
                                 });
                                 
                                //  sequelize.query('SELECT @TRAIN2;').then(train => {
                                //         train2 = Object.values(train[0][0])[0];
                                //  });
                                 
                                //  sequelize.query('SELECT @TRAIN3;').then(price => {
                                //         train3 = Object.values(train[0][0])[0];
                                //  });
                 });;
						          

        }

            res.render('available');

});

router.post('/availableTrains', function(req, res){
    //somewhere else
});


module.exports = router;
