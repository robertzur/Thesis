var express = require('express');
var router = express.Router();
var model = require('../model');

var contact = new model.Contacts({name : 'Janusz'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hi, Contact API is here');
});

router.get('/Janusz', function(req,res, next) {
	res.end('Hi, it\'s '+contact.name);
})

module.exports = router;
