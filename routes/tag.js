var express = require('express');
var router = express.Router();
var model = require('../model');

var Tags = model.Tags;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end('Hi, Tag API is here');
});

router.get('/:name', function(req, res, next){
	var publicKey = req.headers['public-key'];
	console.log(publicKey);
	Tags.find({ }, function(err, tag) {
		console.log('test test');
        if (err)
        {
        	console.log(err);
            res.status(500).send(err);
        }
        else if (tag == null) {
        		res.json(null);
        }
        else if (tag.ownerId != publicKey)
        {
        		console.log('Unauthorized');
            	res.status(401).send('Unauthorized');
        }
        else {
            	res.json(tag);
        }
    });
});

router.post('/', function(req, res, next) {
	var publicKey = req.headers['public-key'];

	var tag = new Tags();

	tag.name = req.body.name;
	tag.ownerId = publicKey;

	tag.save(function(err) {
        if (err) {
			console.log(err);
            res.status(500).send(err); 

		}
		else 
			res.json({ message: 'Tag created: ' + tag._id });
    });
})

module.exports = router;
