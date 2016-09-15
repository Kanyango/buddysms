'use strict';

module.exports = function(app , mongoose){

	var transSchema = new mongoose.Schema({
		
        user        : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
		date        : {type : Date , default: Date.now()},
		item        : {type : String},
		amount      : {type : String},
		qtty        : {type : String}
		
	});
	app.db.model('Trans' , transSchema);
};