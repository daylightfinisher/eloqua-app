var express = require('express');
var router  = express.Router();
var Eloqua = require('../../../eloqua-request');

var LiveChatApi = require('../../../api-client-nodejs').LiveChatApi;
var api = new LiveChatApi('sven_etzold@trendmicro.de', 'addd6ec8b651dfa6a1e48eaa3620098c');
 
/*****************************************************************************
* Middleware Endpoints
****************************************************************************/

router.get('/v1/', function (req, res) 
{
	/*
	var soap = require('soap');
  	var url = './wsdls/Eloqua/ExternalActionService.wsdl';
  	var args = {name: 'value'};
  	soap.createClient(url, function(err, client) 
  	{

  		console.log(err);
  		console.log(client);
    	client.MyFunction(args, function(err, result) 
    	{
        	console.log(result);
      	});
  	});	*/
/*
  	var soap = require('../../../node-soap');
  	var url = 'https://secure.eloqua.com/API/1.2/Service.svc?wsdl';
  	var args = {name: 'value'};
  	soap.createClient(url, function(err, client) 
  	{

  		console.log(err);
  		console.log(client);
    	client.Retrieve(args, function(err, result) 
    	{
        	console.log(result);
      	});
  	});
  	*/
 
  	var easySoap    = require('../../../easysoap');
/*



  	//soap client params
	var clientParams = {

	    //set soap connection data (mandatory values)
	    host    : 'secure.eloqua.com',
	 	path    : '/API/1.2/Service.svc',
	    wsdl    : '/API/1.2/Service.svc?wsdl',

	    //set soap header (optional)
	    
	    header  : [{
	        'UserName'	: 'TrendMicroSweden\\Simon.Diel',
	        'Password'	: 'KCH5ZWbRSPdf138C'
	    }]
	};

	//soap client options
	var clientOptions = 
	{
	    secure : true //is https or http
	};

	//create new soap client
	var SoapClient = new easySoap.Client(clientParams, clientOptions);

	SoapClient.call({
        'method'	: 'Retrieve',

        //optional namespace for call
       // 'namespace' : 'soapMethod2Namespace',

        //optional headers for call
        'headers'	: 
        {
        },
        'params' : 
        {
        }
    })
    .done(

        //success
        function(res) 
        {
            res.data        // response data as array
            res.response    // full response data (including xml)
            res.header      // response header
            console.log("yeah");
        },

        //method fail
        function(err) 
        {
            console.log(err);
        }
    );
*/
	
	//soap client params
	var clientParams = {

	    //set soap connection data (mandatory values)
	    host    : 'secure.eloqua.com',
	 	path    : '/api/1.2/ExternalActionService.svc',
	    wsdl    : '/api/1.2/ExternalActionService.svc?wsdl',

	    //set soap header (optional)
	    
	    header  : [{
	        'UserName'	: 'TrendMicroSweden\\Simon.Diel',
	        'Password'	: 'KCH5ZWbRSPdf138C'
	    }]
	};

	//soap client options
	var clientOptions = 
	{
	    secure : true //is https or http
	};

	//create new soap client
	var SoapClient = new easySoap.Client(clientParams, clientOptions);

	SoapClient.call({
        'method'	: 'GetMemberCountInStepByStatus',

        //optional namespace for call
       // 'namespace' : 'soapMethod2Namespace',

        //optional headers for call
        'headers'	: 
        {
            'Cookie' : 'test'
        },

        'params' : 
        {
            'stepId'  : 5,
            'status' : 'AwaitingAction',
        }
    })
    .done(

        //success
        function(res) 
        {
            res.data        // response data as array
            res.response    // full response data (including xml)
            res.header      // response header
            console.log("yeah");
        },

        //method fail
        function(err) 
        {
            console.log(err);
        }
    );
    

//	console.log(SoapClient);

	res.send("oo654");
});

function getLeadenhancerData(ip, callback)
{
	var http = require('http');

	//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
	var options = {
	  host: 'openapi.leadenhancer.com',
	  path: '/v1/leadopenapi/organisations.json?ip='+ip+'&token=xddlsrO84ufjihHqpJ1szh4e'
	};

	mycallback = function(response) 
	{
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log(str);
	  });
	}

	http.request(options, mycallback).end();
}
 
function getIPbyID(id, callback)
{
	var ip = "11";

	api.visitors.list( function(data)
	{
		console.log(data);
		console.log(data[0].id);
		for(var i = 0; i < data.length; i++)
		{
			if(data[i].id == id)
			{
				return callback(data[i].ip);
			}
		}

		return callback(0);
	});
}




router.post('/v1/webhooks', function(req, res)
{
	var event_type 	= req.body.event_type;  
  	var token 		= req.body.token;  
  	var license_id 	= req.body.license_id; 
  	var visitor_id 	= req.body.visitor.id; 

  	var output = "";
  	output += "event_type: "+event_type+" <br>";
  	output += "token: "+token+" <br>";
  	output += "license_id: "+license_id+" <br>";
  	output += "visitor_id: "+visitor_id+" <br>";
  	res.send("hello <br>" +output);
});


module.exports = router;
