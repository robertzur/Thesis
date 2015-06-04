var express = require('express');
var router = express.Router();
var model = require('../model');

var Contacts = model.Contacts;

/* Test route */
router.get('/', function (req, res, next) {
  res.end('Hi, Contact API is here');
});

/* Display list of contacts with pagination */
router.get('/:pagenumber/:pagesize', function (req, res, next) {

	//Retrieve parameters from URL
	var pageNumber = (req.params.pagenumber != null && req.params.pagenumber > 0 ? req.params.pagenumber : 1);
	var pageSize = (req.params.pagesize != null && req.params.pagesize > 0 ? req.params.pagesize : 1);

	var publicKey = req.headers['public-key']; 

	//Build query based upon provided parameters
	var query = Contacts.find({ _ownerId : "ObjectId("+publicKey+")"}); //Get all
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

router.get('/:id', function (req,res,next) {
	var publicKey = req.headers['public-key'];

	Contacts.findById(req.params.id, function(err, contact) {
            if (err || contact == null)
            	res.status(500).send(err);
            else if (contact.ownerId != publicKey)
            		res.status(401).send('Unauthorized');
            	else {
            		console.log('dupa');
            		res.json(contact);
            	}
        });
});

router.delete('/:id', function (req, res, next){
	var publicKey = req.headers['public-key'];
	console.log(publicKey);

	Contacts.find({ _id : req.params.id, ownerId : publicKey }, function (err, docs){
		if (docs.length > 0) {
			Contacts.find({ _id : req.params.id, ownerId : publicKey }).remove( function (err) {
				if (err)
					res.status(500).send(err);
				else {
					res.send('Contact removed');
					}
			});
		} else {
			res.status(500).send('Contact not found');
		}
	});

	
	
});


/* Add new contact to system */
router.post('/', function (req, res,next) {
	var publicKey = req.headers['public-key'];

	var  contact = new Contacts();

	contact.name = req.body.name;
	contact.description = req.body.description;
	contact.addressLine1 = req.body.addressLine1;
	contact.addressLine2 = req.body.addressLine2;
	contact.phoneNumber = req.body.phoneNumber;
	contact.cellNumber = req.body.cellNumber;
	contact.email = req.body.email;
	contact.skypeId = req.body.skypeId;
	contact.twitter = req.body.twitter;
	contact.facebook = req.body.facebook;
	contact.isContactGroup = req.body.isContactGroup;
	contact.ownerId= publicKey;
	contact.parentId = req.body.parentId;
	contact.tags = null;

	contact.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Contact created' + contact._id });
    });

});

module.exports = router;
