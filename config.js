var config = {}

config.dev = {} //for storing development configuration
config.prod = {} //for storing production configuration

config.dev.databaseUrl = 'mongodb://localhost/dev-contactbook';
config.dev.senderEmail = 'noreply@contactbook.com';


config.prod.databaseUrl = 'mongodb://localhost/contactbook';
config.prod.senderEmail = 'noreply@contactbook.com';

module.exports = config;