'use strict';


module.exports = function(app , mongoose)
{
	require('./server/schema/message')(app , mongoose);
	require('./server/schema/user')(app , mongoose);
	require('./server/schema/trans')(app , mongoose);
	require('./server/schema/contacts')(app , mongoose);
}