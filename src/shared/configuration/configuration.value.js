var configurationValues = {};

if (ENVIRONMENT === 'production') { 
    configurationValues.apiUrl = 'http://nddresearch-seed/nddresearch-seedapi/api/'; // published api
} else {
    configurationValues.apiUrl = 'http://localhost:2437/api/';
}

module.exports = configurationValues;