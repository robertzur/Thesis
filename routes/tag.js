var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hi, Tag API is here');
});

module.exports = router;
