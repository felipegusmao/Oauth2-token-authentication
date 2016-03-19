var bcrypt = require('bcrypt-nodejs');
var createSendToken = require('../services/createSendToken.js');

module.exports = {
  login: function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
      return res.status(401).send({
        message: "username and password required"
      });
    }

    User.findOneByEmail(email, function (err, foundUser) {
      console.log("found ", foundUser);
      if (!foundUser) {
        return res.staus(401).send({
          message: "username or password invalid"
        });
      }

      bcrypt.compare(password, foundUser.password, function (err, valid) {
        if (err) return res.status(403);

        if (!valid) {
          return res.status(401).send({
            message: "username or password invalid"
          });
        }

        // ready to send user and jwt
      })
    })
  },
  register: function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
      return res.status(401).send({
        message: "username and password required"
      });
    }

     User.create({
       email: email,
       password: password
     }).exec(function(err, user) {
        if (err) return res.status(403);

       createSendToken(user, res);
     })

  } // end register
};

