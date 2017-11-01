/* @ngInject */
module.exports = function Todos($http) {
    return {
        get : function() {
            return $http.get('/api/todos');
        },
        getById : function(id) {
            return $http.get('/api/todos/' + id);
        },
        create : function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        edit : function(todoData) {
            return $http.put('/api/todos/' + todoData, JSON.stringify(todoData));
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id);
        }
    }
};
