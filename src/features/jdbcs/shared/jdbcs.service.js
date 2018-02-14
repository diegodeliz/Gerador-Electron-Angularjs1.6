/* @ngInject */
module.exports = function JdbcsService(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'jdbc').then(function (result) {
                return result.data;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'jdbc/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(jdbcData) {
            return $http.post(appConfig.apiUrl + 'jdbc', jdbcData).then(function (data) {
                return data.status;
            });
        },
        edit : function(jdbcData) {
            return $http.put(appConfig.apiUrl + 'jdbc/' + jdbcData, JSON.stringify(jdbcData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'jdbc/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
