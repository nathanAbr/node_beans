var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
mongoose.set('debug', true);

var app = express();

require('./models/user');
var User = mongoose.model('User');

app.use(cookieParser());
app.use(session({
  secret: '46546546abcdef',
  saveUninitialized: false,
  resave: false
}));

// Call user middleware =======================
app.use(function (req, res, next) {
  if (req.cookies.userId) {
    let userId = req.cookies.log;
  }
  if (req.session && (req.session.userId || req.cookies.log)) {
    userId = req.session.userId ? req.session.userId : req.cookies.log;
    User.findById(userId, function (err, user) {
      if (err) return next(err);
      if (!user) {
        req.session.destroy();
        res.clearCookie('log');
        res.render('pages/index');
        return;
      } else {
        req.user = user;
        req.session.user = user;
        req.session.userId = user._id;
        res.cookie('log', userId.toString(), {
          expire: new Date(Date.now() + 86400000)
        });
      }
      next();
    });
  } else next();

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./app/route'));
app.use(bodyParser.json());

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

mongoose.connect('mongodb://uhdnh2o2ysurwl9:LXmXXxCcHMdjFOy6iL0s@boyyrjxzxp7ntmj-mongodb.services.clever-cloud.com:27017/boyyrjxzxp7ntmj');
mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .once('open', function() {
        console.log("we're connected! ")
    });

module.exports = app;
