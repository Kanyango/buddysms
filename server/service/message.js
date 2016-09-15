'use strict';
var mongoose = require('mongoose');

var message = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			message : req.body.message,
			to      : req.body.bundle,
			from    : req.body.from,
			user    : req.payload._id
		};

		req.app.db.models.Message.create(fieldsToSet , 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
	   /*req.app.db.models.User.update({_id: mongoose.Types.ObjectId(req.payload._id)},
			{$inc: {smss: -(req.body.to)}},
			function(err , info){

				if(err)
			{
				return next(err);
			}

			}); */
				res.status(200).json(docs);
			});
	},
	read : function(req , res , next)
	{
		
		req.app.db.models.Message.find({user : req.payload._id})
		.populate('to' , 'name')
		.exec(
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}

				res.status(200).json(docs);
			});
	},
}
module.exports = message;