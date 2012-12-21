

var express = require('express')
  , fs = require('fs')
  , passport = require('passport')

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
require('./config/passport').boot(passport, config)

var app = express()                                       // express app
require('./settings').boot(app, config, passport)         // Bootstrap application settings

// Bootstrap routes
require('./config/routes')(app, passport)

// Start the app by listening on <port>
var port = process.env.PORT || 3001
app.listen(port)
console.log('Express app started on port '+port)


/*
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

//configure static content route blah
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(stylus.middleware(
	  { src: __dirname + '/public'
	  , compile: compile
	  }
	));
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));  
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.session({ secret: csecr }));
  app.use(express.query());  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var oauth;



app.post('/', function(request, response){

    var reqBody = request.body.signed_request;   
    var requestSegments = reqBody.split('.');    
    var requestContext = JSON.parse(new Buffer(requestSegments[1], 'base64').toString('ascii'));
    
    oauth = new Object();
    oauth.access_token = requestContext.oauthToken;
    oauth.instance_url = requestContext.instanceUrl;
    
    var certifications = new Array();
    var query = 'Select Id, Name from Certification__c Limit 5'; 
    org.query(query,oauth, function(err,resp){
    	if(!err && resp.records){
    		for(var i=0; i < resp.records.length; i++){
				certifications.push("Certification --> Name:" + resp.records[i].Name + "|| Id: " + resp.records[i].Id);
    			console.log("Certification --> Name:" + resp.records[i].Name + "|| Id: " + resp.records[i].Id);
    		}
    		
    	}
    });

    response.render('index', {title: 'List of Certifications', data: data});
    //response.sendfile('index.html');

});

app.post('/oauth/callback', function(request, response){

    var reqBody = request.body.signed_request;   
    var requestSegments = reqBody.split('.');    
    var requestContext = JSON.parse(new Buffer(requestSegments[1], 'base64').toString('ascii'));
    
    oauth = new Object();
    oauth.access_token = requestContext.oauthToken;
    oauth.instance_url = requestContext.instanceUrl;
    
    var query = 'Select Id, Name from Certification__c Limit 5'; 
    org.query(query,oauth, function(err,resp){
    	if(!err && resp.records){			
    		/*console.log(resp.records);
    		for(var i=0; i < resp.records.length; i++){				
    			console.log("Certification --> Name:" + resp.records[i].Name + "|| Id: " + resp.records[i].getId());
    		}  		
    		response.render('index.jade', {title: 'List of Certifications', 'certificates': resp.records});		
    	}
    });

    
    //response.sendfile('index.html');

});*/



