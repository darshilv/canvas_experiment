module.exports = {
    development: {
      db: 'mongodb://darshilv:sunrise@linus.mongohq.com:10015/app10179448',
      facebook: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      twitter: {
          clientID: "CONSUMER_KEY"
        , clientSecret: "CONSUMER_SECRET"
        , callbackURL: "http://localhost:3000/auth/twitter/callback"
      },
      github: {
          clientID: 'APP_ID'
        , clientSecret: 'APP_SECRET'
        , callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      google: {
          clientID: "APP_ID"
        , clientSecret: "APP_SECRET"
        , callbackURL: "http://localhost:3000/auth/google/callback"
      },
      forcedotcom: {
          clientID : "3MVG99OxTyEMCQ3jECnCcpSg34i_iCShPS1SC4anGHv7qbKBN6UPKpzSlyGC_XAhTCxv8aP_tag4QLPTIQeAf"
        , clientSecret: "425108006027707740"
        , callbackURL: "http://localhost:3001/auth/forcedotcom/callback"
      }
    }
  , test: {

    }
  , production: {
      forcedotcom: {
        clientID: process.env.CLIENT_ID
      , clientSecret: process.env.CLIENT_SECRET
      , callbackURL: process.env.REDIRECT_URI
      }
    }
}