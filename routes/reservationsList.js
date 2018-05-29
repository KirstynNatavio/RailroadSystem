const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');

var router = express.Router();
var passengerObj;
var reservationObj;
var tripObj;
var originObj;
var destinationObj;
var email;

router.post('/', function(req, res, next) {
	
	email = req.body.email;
	models.PASSENGER.findOne({
		where:{
			EMAIL: email
		}
	}).then((passenger) => {
		passengerObj = passenger;
		models.RESERVATION.findOne({
			where: {
				RESERVATION_ID: parseInt(req.body.reservation)
			}
		}).then((reservation) => {
			reservationObj = reservation;
			models.TRIP.findOne({
				where: {
					RESERVATION_ID: parseInt(reservation.RESERVATION_ID)
				}
			}).then((trip) => {
				tripObj = trip;
				
			
        		
				models.STATION.findOne({
					where: {
						STATION_ID: parseInt(tripObj.ORIGIN)
					}
				}).then((origin) => {
					originObj = origin;
					models.STATION.findOne({
						where: {
							STATION_ID: parseInt(tripObj.DESTINATION)
						}
					}).then((destination) => {
						destinationObj = destination;
							// var tripId = tripObj.TRIP_ID;
							var options = {
								tripId: tripObj.TRIP_ID
							}
        					module.exports = options;
        // 						if(email != null && reservationId != null){
								// 		res.render('reservationsList', {passengerObj, reservationObj, tripObj, originObj, destinationObj})
								// } else {
								// 	//req.flash("error", "There is no reservation on file with the email");
								// 	res.render('reservations');
								// }
						

					})
				})

			})
		})
	})
	

	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;
