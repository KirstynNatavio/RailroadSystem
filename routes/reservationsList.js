const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
var router = express.Router();

router.get('/:email', function(req, res, next) {
	res.send(req.params.email);
	// models.RESERVATIONS.findAll({
	// }).then(())
 //  res.render('reservationsList');
});


module.exports = router;
