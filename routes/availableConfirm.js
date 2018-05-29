const models = require("../models");
const express = require('express');
      
var router = express.Router();
router.post('/', function(req, res, next) {
  var myText = req.body.available;
    console.log(myText);
    res.send(myText);  
  //res.render('availableConfirm');    
        
});







module.exports = router;


