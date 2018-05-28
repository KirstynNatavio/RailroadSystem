const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log(req.allReservations)
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;