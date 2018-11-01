var environments = {};
environments.staging = {
    'httpPort': 3000,
    'envName': 'staging'
};
environments.production = {
    'httpPort': 5000,
    'envName': 'production'
};

var currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var environmentToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = environmentToExport;