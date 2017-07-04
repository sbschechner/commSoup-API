exports.DATABASE_URL = process.env.DATABASE_URL || 
                       global.DATABASE_URL ||
                      'mongodb://localhost/expenseGrouper'; // this is the db name in Mongo - NEED TO CREATE

exports.TEST_DATABASE_URL = (
							process.env.TEST_DATABASE_URL ||
							'mongodb://localhost/test-expenseGrouper');//this is the db name in Mongo - need to create

exports.PORT = process.env.PORT || 8080;