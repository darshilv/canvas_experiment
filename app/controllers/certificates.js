// Listing of Articles
var nforce = require('nforce')
  , _ = require('underscore');

var config = require('../../config/envconfig')['development'];

exports.index = function(req,res){
  res.render('certificates/index', {title: 'List of Certifications', certificates: {}});   
}

exports.canvasindex = function(req, res){
  
  var reqBody = req.body.signed_request;   
  var requestSegments = reqBody.split('.');    
  var requestContext = JSON.parse(new Buffer(requestSegments[1], 'base64').toString('ascii'));
  
  oauth = new Object();
  oauth.access_token = requestContext.oauthToken;
  oauth.instance_url = requestContext.instanceUrl;
  
  var org = new nforce.createConnection({
    clientId: config.forcedotcom.clientID,
    clientSecret: config.forcedotcom.clientSecret,
    redirectUri: config.forcedotcom.callbackURL,    
    apiVersion: 'v26.0',
    environment: 'production'
  });

  //var query = 'Select Id, Name, Certification_Date__c, Certification_Name__c, Expiration_Date__c, Icon_Active__c, Icon_Deactive__c, Role_Tag__c from Certification__c Limit 5';
  var query = 'Select Id, Name, Certification_Date__c, Certification_Name__c from Certification__c Limit 5';
  org.query(query,oauth, function(err,resp){
    if(!err && resp.records){     
      /*console.log(resp.records);
      for(var i=0; i < resp.records.length; i++){       
        console.log("Certification --> Name:" + resp.records[i].Name + "|| Id: " + resp.records[i].getId());
        console.log(resp.records[i].Certification_Name__c);
      }*/       
      res.render('certificates/index', {title: 'List of Certifications', 'certificates': resp.records, showStack: true});   
    }
  });
  /*var org = nforce.createConnection({
    clientId: ,
    clientSecret: ,
    redirectUri: ,    
    apiVersion: 'v24.0',  // optional, defaults to v24.0
    environment: 'production'  // optional, sandbox or production, production default
  });
  */
}