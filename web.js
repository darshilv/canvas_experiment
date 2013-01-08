

var express = require('express')
  , fs = require('fs')  

require('express-namespace')

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/envconfig')[env]

// Bootstrap db connection
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
  , model_files = fs.readdirSync(models_path)
model_files.forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
//require('./config/passport').boot(config)

var app = express()                                       // express app
require('./settings').boot(app, config)         // Bootstrap application settings

// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 3001
app.listen(port)
console.log('Express app started on port '+port)