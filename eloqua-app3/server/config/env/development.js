'use strict';

module.exports =
{
	db : 'mongodb://localhost/mean-dev',
	app :
	{
		name : 'MEAN - FullStack JS - Development'
	},
	facebook :
	{
		clientID : 'APP_ID',
		clientSecret : 'APP_SECRET',
		callbackURL : 'http://localhost:3000/auth/facebook/callback'
	},
	twitter :
	{
		clientID : 'CONSUMER_KEY',
		clientSecret : 'CONSUMER_SECRET',
		callbackURL : 'http://localhost:3000/auth/twitter/callback'
	},
	github :
	{
		clientID : 'APP_ID',
		clientSecret : 'APP_SECRET',
		callbackURL : 'http://localhost:3000/auth/github/callback'
	},
	google :
	{
		clientID : 'APP_ID',
		clientSecret : 'APP_SECRET',
		callbackURL : 'http://localhost:3000/auth/google/callback'
	},
	linkedin :
	{
		clientID : 'API_KEY',
		clientSecret : 'SECRET_KEY',
		callbackURL : 'http://localhost:3000/auth/linkedin/callback'
	},
	eloqua :
	{
		authorizationURL: 'https://login.eloqua.com/auth/oauth2/authorize',
        tokenURL: 'https://login.eloqua.com/auth/oauth2/token',
        clientID: 'a9efe348-33e3-4e00-b548-b9abfc0d187d',
        clientSecret: 'shhh-its-a-secret',
        callbackURL: 'https://ec2-54-187-67-219.us-west-2.compute.amazonaws.com/auth/eloqua/callback'

        /*authorizationURL: 'https://ec2-54-187-67-219.us-west-2.compute.amazonaws.com/auth/oauth2/authorize',
        tokenURL: 'https://login.eloqua.com/auth/oauth2/token',
        clientID: 'a9efe348-33e3-4e00-b548-b9abfc0d187d',
        clientSecret: 'shhh-its-a-secret',
        callbackURL: 'https://ec2-54-187-67-219.us-west-2.compute.amazonaws.com/auth/eloqua/callback'*/
	}
};
