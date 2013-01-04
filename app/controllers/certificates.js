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
  oauth.userId = requestContext.userId;
  //remember that requestContext contains the context information you need
  //console.log(requestContext);
  
  var org = new nforce.createConnection({
    clientId: config.forcedotcom.clientID,
    clientSecret: config.forcedotcom.clientSecret,
    redirectUri: config.forcedotcom.callbackURL,    
    apiVersion: 'v26.0',
    environment: 'production'
  });

  var myCertificates;
  //var query = 'Select Id, Name, Certification_Date__c, Certification_Name__c, Expiration_Date__c, Icon_Active__c, Icon_Deactive__c, Role_Tag__c from Certification__c Limit 5';
  var query = 'Select Id, Name, Certification_Date__c, Certification_Name__c, Rich_Inactive_Badge__c, Rich_Active_Badge__c from Certification__c Limit 5';
  var userquery = 'Select Id, Name, User__c, Certification__c from User_Certification_Junc__c where User__c = \'' + oauth.userId + '\'';

  //nested queries will need to done to fetch cohesive data
  org.query(query,oauth, function(err,resp){
    if(!err && resp.records){
      myCertificates = resp.records; 
      org.query(userquery, oauth, function(err,resp){
        if(!err){
          //console.log(res);
          var usercerts = resp.records;
          for(var i=0; i < usercerts.length; i++){
            for(var j=0; j < myCertificates.length; j++){
              if(myCertificates[j].getId().indexOf(usercerts[i].Certification__c) != -1){
                //console.log(myCertificates[j].getId() + "||" + usercerts[i].Certification__c);
                console.log("found");
                myCertificates[j].showActive = true;
              }
            }
          }

          res.render('certificates/index', {title: 'List of Certifications', 'certificates': myCertificates, showStack: true});
        } else{
          console.log(err);
        }
      });


    }
  });
  //the problem with response here is that it executes before the data is retrieved
     
  /*var org = nforce.createConnection({
    clientId: ,
    clientSecret: ,
    redirectUri: ,    
    apiVersion: 'v24.0',  // optional, defaults to v24.0
    environment: 'production'  // optional, sandbox or production, production default
  });
  */
}