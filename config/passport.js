
var mongoose = require('mongoose')
  /*, LocalStrategy = require('passport-local').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , GoogleStrategy = require('passport-google-oauth').Strategy*/
  , ForceDotComStrategy = require('passport-forcedotcom').Strategy
  , User = mongoose.model('User')


exports.boot = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(err, user)
    })
  })
  
  passport.use(new ForceDotComStrategy({
      clientID: config.forcedotcom.clientID,
      clientSecret: config.forcedotcom.clientSecret,
      callbackURL: config.forcedotcom.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      console.log(profile);
      User.findOne({ 'forcedotcom.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new User({
              name: profile.displayName
            , username: profile.username
            , provider: 'forcedotcom'
            , forcedotcom: profile._json
          })
          user.save(function (err, user) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          return done(err, user)
        }
      })      
    }
  ))
}
