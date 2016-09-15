'use strict';
var mongoose = require('mongoose');

var contact = {

	create : function(req , res , next)
	{
		var fieldsToSet = {

			name      : req.body.name,
			value     : req.body.tags,
			email     : req.body.email,
			user      : req.payload._id
		};

		req.app.db.models.Contact.create(fieldsToSet , 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	read : function(req , res , next)
	{
		
		req.app.db.models.Contact.find(
			{user : req.payload._id , 
				value : {$type : 2 }},
		
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	grouping : function(req , res , next)
	{
		
		req.app.db.models.Contact.find(
			{user : req.payload._id , "value" : {$type : 3 }},
		
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
				console.log('We are groups ' + docs);
			});
	},
	readcont : function(req , res , next)
	{
		
		req.app.db.models.Contact.find({user : req.payload._id },
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	reading : function(req , res , next)
	{
		var page = parseInt(req.params.page);
		var count = parseInt(req.params.count);
		var skip = page > 0 ? ((page - 1) * count): 0;
		
		console.log(page);
		console.log(count);
		console.log(skip);

		req.app.db.models.Contact.find( null , null ,
		{skip :skip , limit : count},
	      function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
				console.log(docs);
			});
   },
   totalUsers : function(req , res , next)
	{
		req.app.db.models.Contact.find({user : req.payload._id})
		.count()
		.exec(
	      function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
				console.log(docs);
			});
   },

	group : function(req , res , next)
	{
		req.app.db.models.Contact.find({user : req.payload._id },
			{_id: false , group: false , user: false , dateCreated : false , __v: false},
			function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		var id = req.body._id;
		var fieldsToSet = 
		{
			name : req.body.name,
			value: req.body.value,
			email: req.body.email
		};

		var options = { new : true };

		req.app.db.models.Contact.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },

	  remove : function(req , res , next)
	  {
	  	var id = mongoose.Types.ObjectId(req.params.id);

	    console.log('i was 2 b dltd' + id);

	  	req.app.db.models.Contact.findByIdAndRemove(id , 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  }
}
module.exports = contact;