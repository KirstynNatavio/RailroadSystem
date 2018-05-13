var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

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

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var config = {
	username: 'nata9798',
	Password: '23399798',
	host: '134.74.126.104',
	dstPort: 3307
};


var tunnel = require('tunnel-ssh');
tunnel(config, function (error, server) {
	if (error) {
		console.log("Error: " + error);
	}
})



// var Sequelize = require('sequelize'),
// sequelize = new Sequelize('S18336Pteam1', 'S18336Pteam1', 'brooklyn', {
// 	host: '134.74.126.107',
// 	dialect: 'mysql',
// 	socketPath: '/opt/mariadb.sock',
// 	port: 3307
// });	

// sequelize
// 	.authenticate()
// 	.then(function(err) {
// 		console.log('Connection has been established successfully.');
// 	}, function(err) {
// 		console.log('Unable to connect to the database: ', err);
// 	}); 


// const User = sequelize.define('user', {
// 	fullName: {
// 		type: Sequelize.STRING
// 	},
// })

// User.sync({force: true}).then(() => {
// 	return User.create({
// 		fullName: 'Person'
// 	})
// })
// .catch((e) => {
// 	console.log(e);
// })





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
