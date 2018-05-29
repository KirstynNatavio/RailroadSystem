const models = require("../models");
const express = require('express');
      
var router = express.Router();
router.post('/', function(req, res, next) {
	res.send(req.body.available);
  //res.render('availableConfirm');    
        
});







module.exports = router;


