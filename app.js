var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash           = require("connect-flash");

var dashboard = require('./routes/dashboard');
var available = require('./routes/available');
var availableConfirm = require('./routes/availableConfirm');
var mainPage = require('./routes/mainPage');
var reservations = require('./routes/reservations');
var reservationsList = require('./routes/reservationsList');
var deleteConfirm = require('./routes/deleteConfirm');

const models = require('./models/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainPage);
app.use('/dashboard', dashboard);
app.use('/', available);
app.use('/availableConfirm', availableConfirm);
app.use('/reservations', reservations);
app.use('/reservationsList', reservationsList);
app.use('/deleteConfirm', deleteConfirm);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// Passenger.sync({force: true}).then(() => {
// 	return Passenger.create({
// 		fullName: 'John Smith',
// 		email: 'email@email.com',
// 		phoneNumber: '2124892492',
// 		password: 'password'
// 	})
// })


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const PORT = process.env.PORT || 8080;


models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
  });
});
module.exports = app;
