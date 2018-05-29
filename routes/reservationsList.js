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
				
				var tripId = trip.TRIP_ID;
        		exports.tripId = tripId;
        		
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


module.exports = router;
