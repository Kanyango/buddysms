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
			
			url: 'https://buddysms.herokuapp.com/dash/smspurchase',
			method: 'POST',
			headers: {
			        'Content-Type': 'application/json',
				'kanyango'    : 'k3yb0@rd',
			    },
			json : {
				   "service_name" : "MPESA",
				   "business_number" : "825048",
				   "transaction_reference" : "DE45GK45",
				   "internal_transaction_id" : 3222,
				   "transaction_timestamp" : "2013-03-18T13:57:00Z",
				   "transaction_type" : "Paybill",
				   "account_number" : "445534",
				   "sender_phone" : "+254903119111",
				   "first_name" : "John",
				   "middle_name" : "K",
				   "last_name" : "Doe",
				   "amount" : 4000,
				   "currency" : "KES",
				   "signature" : "ce801586edeace1f01dc0ca6a03625c1c76af3c7"
				} 
	         	},function(error , response , body){
	         		if(error)
	         		{
	         			return next(err);
	         		}
	         	res.status(200).json(body);	
	         	});

	},
	kopokopo : function(req , res ,next)
	{
		var transaction = new req.app.db.models.Trans();
		
		transaction.trans_ref = req.body.transaction_reference;
		transaction.trans_time = req.body.transaction_timestamp;
		transaction.trans_sender_phone = req.body.sender_phone;
		transaction.amount = req.body.amount;
		transaction.currency = req.body.currency;
		
		transaction.save(function(err , body){
			if(err)
			{
				return next(err);
			}
		res.status(200).json(body);
		});
	}
}
module.exports = trans;
