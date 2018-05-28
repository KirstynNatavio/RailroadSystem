const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();
var passengerObj;
var reservationObj;
var tripObj;
var originObj;

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
				originObj = trip.getORIGIN();
				
				res.render('reservationsList', {passengerObj, reservationObj, allTrips})
			})
		})
	})
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;
