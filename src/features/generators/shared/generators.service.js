/* @ngInject */
module.exports = function Todos($http) {
    return {
        get : function() {
            return $http.get('/api/todos').then(function (result) {
                return result.data;
            });
        },
        getById : function(id) {
            return $http.get('/api/todos/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(todoData) {
            return $http.post('/api/todos', todoData).then(function (data) {
                return data.status;
            });
        },
        edit : function(todoData) {
            return $http.put('/api/todos/' + todoData, JSON.stringify(todoData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
