const   Sequelize       = require('sequelize'),
        models          = require('../models'),
        express         = require('express'),
        dashboard       = require('dashboard.js'),
        options         = dashboard.options,
        origin          = options.origin,
        destination     = options.destination,
        train_timeday   = options.train_timeday,
        date            = options.date;
    
var router              = express.router();
    
var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
                });

router.get('/availableTrains', function(req, res){
      
      availableTrains();
      
      
      function availableTrains(){
          
                
                              
                                
                              var train_replacements = [
                                    origin,
                                    destination,
                                    train_timeday,
                                    date
                              ];    
                              
                              sequelize.query('call GET_AVAILABLE_TRAINS(?, ?, ?, ?, @TRAIN1, @TRAIN2, @TRAIN3);', {
		                            replacements: train_replacements

		                     });
						          

        }

            res.render('available');

});

router.post('/availableTrains', function(req, res){
    //somewhere else
});


module.exports = router;
