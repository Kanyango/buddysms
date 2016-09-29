'use strict';

var mongoose = require('mongoose');
var config = require('./config');
var jwt = require('express-jwt');
var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
var user    = require('./server/service/user');
var message    = require('./server/service/message');
var trans   = require('./server/service/trans');
var contact   = require('./server/service/contact');

module.exports = function(app , passport)
{
    //update sms
    app.post('/updatesms' , auth , user.sms);
    //auth sms
    
    app.post('/authenticateText' , contact.sms);
    app.post('/savetext' , auth , message.template);
    app.post('/session/create' , user.create);
    app.post('/login' , user.login);
    app.get('/dash', auth , user.readProfile);

    //recover pass
    app.get('/recover' , auth , user.recover);
    //buy sms
    app.post('/confirmsms' , trans.purchsms);


    app.post('/message' , auth ,   message.create);
    app.post('/trans' , auth ,   trans.create);

    //contact list routes

    app.post('/contact' , auth , contact.create);
    app.get('/contact' , auth , contact.read);
    app.get('/contacts' , auth , contact.readcont);
    app.get('/contactgroup' , auth , contact.grouping);
    app.get('/totalUsers' , auth , contact.totalUsers);
    //app.get('/contact/' , auth  , contact.reading);
    app.get('/group' , auth , contact.group);
    app.put('/contact/' , auth ,  contact.update);
    app.delete('/contact/:id' , contact.remove);

    //messages routes
    app.post('/kopokopo' , trans.kopokopo);
    app.post('/message' , auth , message.create);
    app.get('/message' , auth , message.read);

    //auto route
 

    app.get('/oauth/facebook' , passport.authenticate('facebook' , {scope :  [ 'email' ] }));
    app.get('/oauth/facebook/callback' , passport.authenticate('facebook',{
            successRedirect : '/home',
            failureRedirect  : '/'
        }));
    app.get('/auth/twitter' , passport.authenticate('twitter'));
    app.get('/auth/twitter/callback' , passport.authenticate('twitter',{
        	successRedirect : '/home',
        	failureRedirect  : '/'
        }));

    app.get('/logout' , function(req , res){
        	req.logout();
        	res.redirect('/');
        });
    	//app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})

};
