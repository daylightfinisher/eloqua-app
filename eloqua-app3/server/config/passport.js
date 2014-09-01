'use strict';

var mongoose = require('mongoose'),
    OAuth2Strategy = require('passport-oauth2'),
    User = mongoose.model('User'),
//    util = require('util'),
    config = require('./config');
var https = require('https');

module.exports = function(passport)
{

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done)
    {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done)
    {
        User.findOne(
        {
            _id: id
        }, '-salt -hashed_password', function(err, user)
        {
            done(err, user);
        });
    });


    passport.use('eloqua', new OAuth2Strategy(
        {
            authorizationURL: config.eloqua.authorizationURL,
            tokenURL: config.eloqua.tokenURL,
            clientID: config.eloqua.clientID,
            clientSecret: config.eloqua.clientSecret,
            callbackURL: config.eloqua.callbackURL,
            customHeaders : 
            {
                'Authorization' : 'Basic '+ (new Buffer(config.eloqua.clientID+ ':'+config.eloqua.clientSecret)).toString('base64')
            }
        },
        function(accessToken, refreshToken, profile, done)
        {
            //var myauth = 'Bearer '+accessToken;
            var myauth = 'Bearer '+ accessToken;
            //var myauth = 'Bearer '+ (new Buffer(accessToken)).toString('base64');
            var options = 
            {
              host: 'secure.eloqua.com',
              port: 443,
              path: '/API/REST/1.0/data/contacts?depth=complete&search=*@relatedpixels.com&page=0&count=10',
              method: 'GET',
              headers:
              {
                'Authorization': myauth
              }
            };

            https.request(options, function(res) 
            {
                console.log('called: '+options.host+''+options.path);
                console.log('Got response: ' + res.statusCode);
                console.dir(res.body);
            }).on('error', function(e) 
            {
              console.log('Got error: ' + e.message);
              console.dir(e);
            });

            User.findOne(
            {
               'eloqua.id': config.eloqua.clientID
            }, function(err, user)
            {
                //console.log('user:'+user);
                //console.log('profile:'+util.inspect(profile, true, null));
                //console.dir(profile);
                //console.log(JSON.stringify(profile));


                if (err)
                {
                    return done(err);
                }
                if (!user)
                {
                   // console.log(' != false');
                    
                    user = new User(
                    {
                        name: 'eloqua',
                        email: 'null@null.com',
                        username: config.eloqua.clientID,
                        provider: 'eloqua',
                        eloqua: 
                            {
                                id : config.eloqua.clientID,
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            },
                        roles: ['authenticated']
                    });
                    user.save(function(err)
                    {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                }
                else
                {
                    return done(err, user);
                }
            });
        }
    ));
};