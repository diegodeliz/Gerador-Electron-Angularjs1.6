/* @ngInject */
module.exports = function generatorService(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'generator').then(function (result) {
                return result.data;
            });
        },
        getNote : function() {
            return $http.get(appConfig.apiUrl + 'note').then(function (result) {
                return result.data;
            });
        },
        getSocket : function() {
            return $http.get(appConfig.apiUrl + 'socket').then(function (result) {
                return result.data;
            });
        },
        getJdbc : function() {
            return $http.get(appConfig.apiUrl + 'jdbc').then(function (result) {
                return result.data;
            });
        },
        getFile : function(id) {
            return $http.get(appConfig.apiUrl + 'file/' + id).then(function (result) {
                return result.data;
            });
        },
        postFile : function(fileData) {
            return $http.post(appConfig.apiUrl + 'file', fileData).then(function (data) {
                return data.status;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'generator/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(generatorData) {
            return $http.post(appConfig.apiUrl + 'generator', generatorData).then(function (data) {
                return data.status;
            });
        },
        edit : function(generatorData) {
            return $http.put(appConfig.apiUrl + 'generator/' + generatorData, JSON.stringify(generatorData)).then(function (data) {
                return data.status;
            });
        },
        geraNotas : function(id) {
            return $http.get(appConfig.apiUrl + 'geraNotas/' + id).then(function (result) {
                return result.data;
            });
        },
        pararGerarNotas : function(id) {
            return $http.get(appConfig.apiUrl + 'pararGerarNotas/' + id).then(function (result) {
                return result.data;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'generator/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
