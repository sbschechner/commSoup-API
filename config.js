exports.DATABASE_URL = process.env.DATABASE_URL || 
                       global.DATABASE_URL ||
                      'mongodb://localhost/soupdata3'; 
exports.TEST_DATABASE_URL = (
							process.env.TEST_DATABASE_URL ||
							'mongodb://localhost/test-soupdata3');

exports.PORT = process.env.PORT || 8080;