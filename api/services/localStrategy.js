/**
 * Created by fgusmao on 24/01/16.
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User.js');

var strategyOptions = {
    usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions, function (email, password, done) {
    var searchUser = {
        email: email
    };

    User.findOne(searchUser, function (err, user) {
        if (err) return done(err);

        if (!user) return done(null, false, {
            message: 'Wrong email/password'
        });

        user.comparePasswords(password, function (err, isMatch) {
            if (err) return done(err);

            if (!isMatch) return done(null, false, {
                message: 'Wrong email/password'
            });

            return done(null, user);
        });
    })

});

exports.register = new LocalStrategy(strategyOptions, function (email, password, done) {

    var newUser = new User({
        email: email,
        password: password
    });

    User.findOne({email: email}, function (err, user) {
        if (err) return done(err);

        if (user) return done(null, false, {
            message: 'email already exists'
        });
    });

    newUser.save(function (err) {
        done(null, newUser);
    })

});
