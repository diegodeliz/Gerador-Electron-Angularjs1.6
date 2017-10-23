var configurationValues = {};

if (ENVIRONMENT === 'production') { 
    configurationValues.apiUrl = 'http://localhost:1914/api/'; // published api
} else {
    configurationValues.apiUrl = 'http://localhost:1914/api/';
}

module.exports = configurationValues;