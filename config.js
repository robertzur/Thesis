var config = {}

config.dev = {} //for storing development configuration
config.prod = {} //for storing production configuration

config.dev.databaseUrl = 'mongodb://localhost/dev-contactbook';

config.prod.databaseUrl = 'mongodb://localhost/contactbook';

module.exports = config;