var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var config = require('./config.js');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/User.js');

var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'Site2',
    subTitle: 'Thanks for signing up!',
    body: 'Please verify your email address by clicking the button below'
};

exports.send = function (email) {
    var payload = {
        sub: email
    };

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'hostnaem',
        secure: true,
        auth: {
            user: '',
            pass: config.SMTP_PASS
        }
    }));

    var mailOptions = {
        from: 'Accounts <accounts@socialplay.com>',
        to: email,
        subject: 'Site2 Account Verification',
        html: getHTML(token)
    };

    transporter.sendMain(mailOptions, function (err, info) {
        if (err) return res.status(500, err);

        console.log('email sent ', info.response);
    })
};

_.templateSettings = {
    interpolates: /\{\{(.+?)\}\}/g
};

exports.handler = function (req, res) {
    var token = req.query.token;
    //console.log(token);
    var payload = jwt.decode(token, config.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) return handleError(res);

    User.findOne({email:email}, function(err, foundUser) {
        if(err) return res.status(500);

        if(!foundUser) return handleError(res);

        if(!user.active) user.active = true;

        user.save(function(err) {
            if(err) return res.status(500);

            return res.redirect(config.APP_URL);
        })
    })
};

function handleError(res) {
    return res.status(401).send({
        message: 'Authentication failed, unable to verify email'
    })
}

function getHtml(token) {
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);
}