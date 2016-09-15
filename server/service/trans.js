'use strict';
var mongoose = require('mongoose');

var trans = {

	create : function(req , res , next)
	{
		

		var fieldsToSet = {

			item    : req.body.item,
			amount  : req.body.amount,
			qtty    : req.body.qtty,
			user    : req.payload._id
		};

		req.app.db.models.Trans.create(fieldsToSet , 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
		req.app.db.models.User.update({_id : mongoose.Types.ObjectId(req.payload._id)},
			{$set: {smss: req.body.qtty}} , function(err , info){

				if(err)
				{
					return next(err);
				}

			});
				res.status(200).json(docs);
			});
	}
}
module.exports = trans;