require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

// const auth = require('./auth')(process.env.IDENTITY_ENDPOINT);

var systemRouter = require('./routes/system');
var apiRouter = require('./routes/api');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup the logger
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("dist"));

var webpackAssets = require('express-webpack-assets');
app.use(webpackAssets(path.join(__dirname, '../dist/manifest.json'), {
	devMode: process.env.NODE_ENV === 'development'
}));

app.use('/system', systemRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(80, () => console.log("Listening on port 80!"));
