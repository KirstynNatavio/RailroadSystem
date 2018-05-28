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
		res.render('reservationsList/:${passenger.PASSENGER_ID}');
	})	.catch((err) => {
		res.send(err); 	// CHANGE LATER TO SHOW THAT A PASSENGER HAS NO RESERVATIONS
	})
	
})


module.exports = router;
