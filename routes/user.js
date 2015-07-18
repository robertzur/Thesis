var express = require('express');
var router = express.Router();
var config =require('../config').dev;
var model = require('../model');
var Users = model.Users;
var uuid = require('node-uuid');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'contactbookservice',
			pass: 'T2VMIV2swwIgmWNRTCql'
		}
	});
	
/* Register new account */
router.post('/', function(req, res, next) {
	var email = req.body.email;
	

	if (!email)
	{
		console.error('Bad Input Data - Email address for registration has not been provided');
		res.status(400).end('Bad Input Data');
	}
	else {
		Users.find({'email' : email}, function(err, docs) {
			if (docs.length > 0) {
				console.log(docs);
				console.error('Bad Input Data - Email address already exists');
				res.status(500).end('Bad Input Data');		
			} else {
				/* Generate Globally Unique Private Key*/
				var privateKey = uuid.v1();

				var user = new Users();
				user.privateKey = privateKey;
				user.email = email;

				user.save(function(err) {
			        if (err)
			            res.end(err);

			       	transporter.sendMail({
			       		
			       		from: config.SenderAddress,
			       		to: email,
			       		subject: 'Registration confirmation',
			       		text: 'Dear user,\n'
			       		+ 'Your account in the Contactbook service has been set up. Below are your access keys:\n'
			       		+ 'Public Key: '+user._id+'\n'
			       		+ 'Private Key: '+user.privateKey+'\n\n'
			       		+ '***** IMPORTANT ******\n'
			       		+ 'DO NOT DISCLOSE YOUR KEYS ANYBODY, ESPECIALLY PRIVATE KEY!\n\n'
			       		+ 'Please use your keys only with authorized systems and services'

			       	}, function(error, info){
					    if(error){
					        console.log(error);
					    }else{
					        console.log('Message sent: ' + info.response);
				   		}
					});
			        res.json({ message: 'User registered'});
			    });
			}
		});
	}	
});


module.exports = router;
