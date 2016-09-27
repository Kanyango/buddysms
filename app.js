var cluster = require('cluster');
var config  = require('./config');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var http     = require('http');
var path     = require('path');
var jwt      = require('jsonwebtoken');

if(cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else
{

var app = express();

app.config = config;

app.server = http.createServer(app);

app.db = mongoose.createConnection(config.mongodb.uri);
app.db.once('open', function(){

});

require('./models')(app, mongoose);

//var port = process.env.PORT || 7000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(express.static(__dirname + '/client/www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true,
    saveUninitialized: false,
    secret: 'a4f8071f-c873-4447-8ee2',
    store: new mongoStore({url : app.config.mongodb.uri})
}));

app.use(passport.initialize());
app.use(passport.session());

require('./passport')(app , passport);

require('./routes')(app , passport);

app.server.listen(process.env.PORT || 7000 , function(){

});
console.log('Process ' + process.pid + ' is listening to all incoming requests');
	
}








