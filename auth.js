var model = require('./model');
var Users = model.Users;
var crypto = require('crypto');

module.exports = function() {

	return function(req, res, next) {
		var publicKey = req.headers['public-key'];
		var timestamp = req.headers['timestamp'];
		var digest = req.headers['digest'];
		var httpMethod = req.method;
		var url = req.url;

		if (publicKey == null || timestamp == null || digest == null) {
			res.status(401).send('Unauthorized');
		} else {
			Users.findOne({'_id' : publicKey}, function(err, docs) {
				if (docs.length < 1) {
					res.status(401).send('Unauthorized');
				} else {

					var privateKey = docs.privateKey;
					console.log('Private key: '+privateKey);
					var internalDigest = crypto
		 									.createHash("sha256")
											.update(privateKey+publicKey+httpMethod+url+timestamp+privateKey)
											.digest("base64");
					if (internalDigest != digest) {
						res.status(401).send('Unauthorized');
					} else {
						next(); // Authentication passed	
					}
				}	 
			});	
		}
	}
}