var mongoose = require('mongoose');
var config =require('./config').dev;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Contact = new Schema({
	 "name" : {type : String, index: true},
	 "description" : String,
	 "addressLine1" : String,
	 "addressLine2" : String,
	 "phoneNumber" : String,
	 "cellNumber" : String,
	 "email" : String,
	 "skypeId" : String,
	 "twitter" : String,
	 "facebook" : String,
	 "isContactGroup" : Boolean,
	 "ownerId" : ObjectId,
	 "parentId" : ObjectId,
	 "tags" : [ ObjectId ] //array of ObjectId items
});

var User = new Schema ({
	"privateKey" : String,
	"email" : String,
	"enabled" : { type: Boolean, default: true }
});

var Log = new Schema ({
	"sourceIP" : String,
	"sourceUserAgent" : String,
	"eventType" : String,
	"userName" : String,
	"message" : String,
	"timestamp" : { type: Date, default: Date.now }
})

var Tag = new Schema({
	"name" : String,
	"ownerId" : ObjectId
})

mongoose.connect(config.databaseUrl)

var Contacts = mongoose.model('Contacts', Contact);
var Users = mongoose.model('Users', User);
var Logs = mongoose.model('Logs', Log);
var Tags = mongoose.model('Tags', Tag);

exports.Contacts = Contacts;
exports.Users = Users;
exports.Logs = Logs;
exports.Tags = Tags;
