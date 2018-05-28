const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();
var passengerObj;
var reservationObj;
router.post('/', function(req, res, next) {
	models.PASSENGER.findAll({
		where:{
			EMAIL: req.body.email
		}
	}).then((passenger) => {
		passengerObj = passenger;
		models.RESERVATIONS.findOne({
			where: {
				RESERVATION_ID: req.body.reservation
			}
		}).then((reservation) => {
			reservationObj = reservation;
			models.TRIP.findAll({
				where: {
					RESERVATION_ID: reservation.RESERVATION_ID
				}
			}).then((allTrips) => {
				res.render('/', {passengerObj, reservationObj, allTrips})
			})
		})
	})
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;
