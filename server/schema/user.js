'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = function(app , mongoose)
{
	var userSchema = new mongoose.Schema({
		hash     : String,
		salt     : String,
		phone    : {type: Number , unique: true},
		username: {type: String , unique: true , lowercase: true},
		smss     : {type: Number},
		bname    : String,
	    industry : String,
	    location : String,
	    address  : String,
	    office   : String,
	    website  : String,
		timeCreated : {type: Date , default: Date.now},
		facebook : {
			       id    : String,
			       token : String, 
			       email : String,
			       name  : String
		                  },
		twitter  : {
			id : String,
			token : String,
			username  : String,
			displayName : String
		},
		message : [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
		trans   : [{type: mongoose.Schema.Types.ObjectId,   ref: 'Trans'}],
		contacts : [{type: mongoose.Schema.Types.ObjectId,   ref: 'Contact'}]
	});	
	userSchema.methods.setPassword = function(password){

		this.salt = crypto.randomBytes(16).toString('hex');
		this.hash = crypto.pbkdf2Sync(password , this.salt , 1000 , 64).toString('hex');
	};
	userSchema.methods.validatePassword = function(password) {
     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
     return this.hash === hash;
   };
	userSchema.methods.generateJwt  =  function(){

		var today = new Date();
		var exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({_id: this._id ,
                          username : this.username ,
                          exp: parseInt(exp.getTime() / 1000), } , app.config.secret );
	}; 
    app.db.model('User', userSchema);
	//mongoose.model('User' , userSchema);
};