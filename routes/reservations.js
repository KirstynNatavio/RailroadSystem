const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('reservations');
});

router.post('/', function(req, res, next) {
	models.PASSENGER.findOne({
		where: {
			EMAIL: req.body.email
		}
	}).then((passenger) => {
		models.RESERVATION.findAll({
			where: {
				PASSENGER_ID: passenger.PASSENGER_ID
			}
		})
	}).then((allReservations) => {
		res.render('reservationsList', {allReservations});
	}).catch((err) => {
		res.send(err); 	// CHANGE LATER TO SHOW THAT A PASSENGER HAS NO RESERVATIONS
	})
	
})


module.exports = router;