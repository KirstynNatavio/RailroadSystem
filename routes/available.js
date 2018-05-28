var router          = require('dashboard.js'),
    options         = router.options,
    origin          = options.origin,
    destination     = options.destination,
    train_timeday   = options.train_timeday,
    date            = options.date;

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
    res.render('reservation');
});
