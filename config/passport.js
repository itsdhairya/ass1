const passport = require('passport');

module.exports = function() {
  const User = require('../models/user');
  
  // When user is authenticated, password saves thier _id to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// Passport uses _id to get user objects from database
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, '-password -salt', (err, user) => {
      done(err, user);
    });
  });

  require('./local')();
};