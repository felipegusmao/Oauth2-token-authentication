var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var passport = require('passport');
var googleAuth = require('./services/googleAuth.js');
var facebookAuth = require('./services/facebookAuth.js');
var createSendToken = require('./services/jwt.js');
var LocalStrategy = require('./services/localStrategy');
var jobs = require('./services/jobs');
var emailVerification = require('./services/emailVerification.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), function (req, res) {
    emailVerification.send(req.user.email);
    createSendToken(req.user, res);
});
app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});
app.post('/auth/facebook', facebookAuth);
app.post('/auth/google', googleAuth);
app.get('/jobs', jobs);

mongoose.connect('mongodb://localhost/site2');

var server = app.listen(3000, function () {
    console.log('api listening on', server.address().port);
});
