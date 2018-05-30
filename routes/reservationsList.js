const models = require("../models");
const express = require('express');
const sequelize = require('sequelize');
const moment	= require('moment');

var router = express.Router();
var passengerObj;
var reservationObj;
var tripObj;
var originObj;
var destinationObj;
var email;
var valid;

router.post('/', function(req, res, next) {
	valid = true;
	email = req.body.email;
	models.PASSENGER.findOne({
		where:{
			EMAIL: email
		}
	}).then((passenger) => {
		if (passenger == null) {
			valid = false;
			res.render('reservationsList', {passengerObj, reservationObj, tripObj, originObj, destinationObj, valid})
		}
		passengerObj = passenger;
		models.RESERVATION.findOne({
			where: {
				RESERVATION_ID: parseInt(req.body.reservation)
			}
		}).then((reservation) => {
			if (reservation == null) {
				valid = false;
				res.render('reservationsList', {passengerObj, reservationObj, tripObj, originObj, destinationObj, valid})
			}
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

        					models.STOPS_AT.findOne({
        						where: {
        							STATION_ID: destinationObj.STATION_ID,
        							TRAIN_ID: tripObj.TRAIN_ID
        						}
        					}).then((stops_at) => {
        						
        						var trip_date = new Date(tripObj.TRIP_DATE);
        						
        						
        						trip_date = moment(trip_date);
        						
        						trip_date = trip_date.format('ll'); 
        						
        					//	tripObj.TRIP_DATE = trip_date;
        					// console.log('BEFORE: ' + tripObj.TRIP_TIME);
        					// console.log('BEFORE: ' + tripObj.TRIP_TIME)
        					
        					var trip_start = new Date(tripObj.TRIP_TIME);
        					var trip_arrival = new Date(stops_at.ARRIVAL);
  
        					trip_start = formatAMPM(trip_start);
        					trip_arrival = formatAMPM(trip_arrival);
        					
        					//UTC
        					function formatAMPM(date) {
							  var hours = date.getHours();
							  var minutes = date.getMinutes();
							  console.log(minutes);
							  console.log(date);
							  var ampm = (hours-4) >= 12 ? 'pm' : 'am';
							  hours = (hours-4 % 12);
							  hours = hours ? hours : 12; // the hour '0' should be '12'
							  //minutes = minutes < 10 ? '0'+minutes : minutes;
							  var strTime = hours + ':' + minutes + ' ' + ampm;
							  return strTime;
							}
			
							console.log(trip_start);
							console.log(trip_arrival);
        						

        						
       
        						
        						res.render('reservationsList', {passengerObj, reservationObj, tripObj, trip_date, valid, originObj, destinationObj, trip_start, trip_arrival})

        					})







        // 						if(email != null && reservationId != null){
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
