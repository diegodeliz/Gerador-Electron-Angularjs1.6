var configurationValues = {};

if (ENVIRONMENT === 'production') { 
    configurationValues.apiUrl = 'http://localhost:8080/api/'; // published api
} else {
    configurationValues.apiUrl = 'http://localhost:8080/api/';
}

module.exports = configurationValues;