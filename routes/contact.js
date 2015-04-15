var express = require('express');
var router = express.Router();
var model = require('../model');

var Contacts = model.Contacts;

/* Test route */
router.get('/', function(req, res, next) {
  res.end('Hi, Contact API is here');
});

/* Display list of contacts with pagination */
router.get('/:pagenumber/:pagesize', function(req, res, next) {

	//Retrieve parameters from URL
	var pageNumber = (req.params.pagenumber != null && req.params.pagenumber > 0 ? req.params.pagenumber : 1);
	var pageSize = (req.params.pagesize != null && req.params.pagesize > 0 ? req.params.pagesize : 1);

	//Build query based upon provided parameters
	var query = Contacts.find({}); //Get all
	query.limit(pageSize);
	query.skip((pageNumber - 1) * pageSize);

	query.exec(function (err, docs) {
		if(err) {
			res.end('Error occured' + err.message);
		} else {
			res.json(docs);
		}
	});
});

module.exports = router;
