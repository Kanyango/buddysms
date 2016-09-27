'use strict';
var mongoose = require('mongoose');
var request = require('request');

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
	},
	purchsms : function(req , res ,next)
	{

		request({
			
			url: 'https://buddysms.herokuapp.com/transaction_consumer',
			method: 'POST',
			headers: {
			        'Content-Type': 'application/json',
			    },
			json : {
				   "service_name" : "MPESA",
				   "business_number" : "825048",
				   "transaction_reference" : "DE45GK45",
				   "internal_transaction_id" : 3222,
				   "transaction_timestamp" : "2013-03-18T13:57:00Z",
				   "transaction_type" : "Paybill",
				   "account_number" : "445534",
				   "sender_phone" : "+254903119111"
				   "first_name" : "John",
				   "middle_name" : "K",
				   "last_name" : "Doe",
				   "amount" : 4000,
				   "currency" : "KES",
				   "signature" : "dfafwerewKkladaHOKJdafdf"
				} 
	         	},function(error , response , body){
	         		if(error)
	         		{
	         			return next(err);
	         		}
	         	res.status(200).json(body);	
	         	});

	}
}
module.exports = trans;
