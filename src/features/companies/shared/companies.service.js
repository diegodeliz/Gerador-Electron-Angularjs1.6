/* @ngInject */
module.exports = function CompaniesService(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'company').then(function (result) {
                return result.data;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'company/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(companyData) {
            return $http.post(appConfig.apiUrl + 'company', companyData).then(function (data) {
                return data.status;
            });
        },
        edit : function(companyData) {
            return $http.put(appConfig.apiUrl + 'company/' + companyData, JSON.stringify(companyData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'company/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
