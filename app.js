var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var contactRoutes = require('./routes/contact');
var userRoutes = require('./routes/user');
var tagRoutes = require('./routes/tag');
var auth = require('./auth.js');

var app = express();
app.use(logger(':method :url :response-time :status :user-agent Timestamp: :req[Timestamp]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRoutes);
app.use(auth()); //auth module is here because userRoutes don't need authentication
app.use('/contact', contactRoutes);
app.use('/tag', tagRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
