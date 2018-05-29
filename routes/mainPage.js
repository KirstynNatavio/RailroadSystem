const models  = require("../models");
const express = require('express');
const Sequelize = require('sequelize');
      
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('mainPage')
        
});





module.exports = router;


