var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    }
  },
  beforeCreate: function (attributes, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(attributes.password, salt, null, function(err, hash) {
        if (err) return next(err);

        attributes.password = hash;
        next();
      })
    })
  }
};

