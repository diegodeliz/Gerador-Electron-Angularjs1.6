/* @ngInject */
module.exports = function Todos(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'todos').then(function (result) {
                return result.data;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'todos/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(todoData) {
            return $http.post(appConfig.apiUrl + 'todos', todoData).then(function (data) {
                return data.status;
            });
        },
        edit : function(todoData) {
            return $http.put(appConfig.apiUrl + 'todos/' + todoData, JSON.stringify(todoData)).then(function (data) {
                return data.status;
            });
        },
        teste : function(todoData) {
            return $http.put(appConfig.apiUrl + 'teste/' + todoData, JSON.stringify(todoData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'todos/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
