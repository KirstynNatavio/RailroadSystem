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





module.exports = router;


