const models = require("../models");
const express = require('express');
var router = express.Router();


router.get('/', function(req, res){
    res.render('mainPage'); 
});