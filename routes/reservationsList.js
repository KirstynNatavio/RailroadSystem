const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();

router.get('/:passengerID', function(req, res, next) {
	console.log(req.params.passengerID);
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;
