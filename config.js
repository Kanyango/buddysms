
exports.mongodb = {
	uri: 'mongodb://127.0.0.1:27017/smsdb'
	//uri: 'mongodb://kariuki:androidapps@ds033126.mlab.com:33126/smsappdb'
};

exports.secret = 'b7TY?>m6wl_i/<';

exports.oauth = {

	'facebook' :{

		'clientID'    : '1091247900936084',
		'clientSecret': '941a60d3455544c0aa1ffbae17d3d95d',
		'callbackURL' : 'http://localhost:7000/oauth/facebook/callback'
	},

	'twitter' :{
		'consumerKey'    : 't3r87nEjaUpQpyayIzRwKPhOO',
		'consumerSecret' : 'OI5xaXTgkURzEKkIMbONQuYudAJTOq0mve509Vl39lW3iUFwrD',
		'callbackUrl' : 'http://localhost:7000/oauth/twitter/callback'
	}
};
