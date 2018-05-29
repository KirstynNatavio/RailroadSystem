const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');

var router = express.Router();
var passengerObj;
var reservationObj;
var tripObj;
var originObj;
var destinationObj;

router.post('/', function(req, res, next) {
	models.PASSENGER.findOne({
		where:{
			EMAIL: req.body.email
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
						res.render('reservationsList', {passengerObj, reservationObj, tripObj, originObj, destinationObj})

					})
				})

			})
		})
	})
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});

router.delete('/', function(req, res){
		var answer = req.body.deleteanswer;
		var origin;
		var destination;
		var trainId;
		var date;
		var passengerId;
		var reservationId;
		var tripId;
		
				models.TRIP.findOne({
					where: {
						TRIP_ID: tripObj.dataValues.TRIP_ID
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
										});
									});
								});
							});
						});
			

});

module.exports = router;
