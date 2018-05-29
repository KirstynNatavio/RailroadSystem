const models = require("../models");
const express = require('express');
const Sequelize = require('sequelize');

var sequelize = new Sequelize('S18336PRRteam1', 'user', 'password', {
                    host: 'localhost',
                    dialect: 'mysql',
                    port: 3306
});

var router = express.Router();

router.post('/', function(req, res){
		var answer = req.body.deleteanswer;
		var origin;
		var destination;
		var trainId;
		var date;
		var passengerId;
		var reservationId;
		var tripId;
		
		var options = require('./reservationsList');
		tripId = options.tripId;
		
				models.TRIP.findOne({
					where: {
						TRIP_ID: tripId
					}
				}).then(tripOb => {
						var trip     = tripOb.dataValues;
						
						tripId       = trip.TRIP_ID
						origin		 = trip.ORIGIN;
						destination  = trip.DESTINATION;
						trainId 	 = trip.TRAIN_ID;
						date		  = trip.TRIP_DATE;
						passengerId   = trip.PASSENGER_ID;
						reservationId = trip.RESERVATION_ID;
				});
				
						sequelize.query('call ADD_FREE_SEAT(?, ?, ?);', {
								replacements: [origin, destination, trainId, date]
						}).then(() => {
							sequelize.query('SET FOREIGN_KEY_CHECKS = 0;').then(() => {
								sequelize.query('DELETE FROM PASSENGER WHERE PASSENGER_ID=?;', {
									replacements: [passengerId]
								}).then(() => {
									sequelize.query('DELETE FROM RESERVATION WHERE RESERVATION_ID=?;', {
										replacements: [reservationId]
									}).then(() => {
										sequelize.query('DELETE FROM TRIP WHERE TRIP_ID=?;', {
											replacements: [tripId]
										}).then(() => {
											sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
											res.send('everything worked!!');
										});
									});
								});
							});
						});
			

});

module.exports = router;
