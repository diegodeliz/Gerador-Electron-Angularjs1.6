/* @ngInject */
module.exports = function SocketService(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'socket').then(function (result) {
                return result.data;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'socket/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(socketData) {
            return $http.post(appConfig.apiUrl + 'socket', socketData).then(function (data) {
                return data.status;
            });
        },
        edit : function(socketData) {
            return $http.put(appConfig.apiUrl + 'socket/' + socketData, JSON.stringify(socketData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'socket/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
