var mongoose = require('mongoose')
	, User = mongoose.model('User')
	, nforce = require('nforce')
	, async = require('async');

//module.exports = function (app, passport, auth) { //this is the standard changing this in the next line for forcedotcom
module.exports = function (app) {	
  
  // certificate routes controller
  var certificates = require('../app/controllers/certificates')

  // home route
  app.post('/', certificates.canvasindex)
  app.get('/', certificates.index)

  app.post('/oauth/callback', certificates.canvasindex)

}

