/* @ngInject */
module.exports = function noteService(appConfig, $http) {
    return {
        get : function() {
            return $http.get(appConfig.apiUrl + 'note').then(function (result) {
                return result.data;
            });
        },
        getCompanies : function() {
            return $http.get(appConfig.apiUrl + 'company').then(function (result) {
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
        postContent : function(fileData) {
            return $http.post(appConfig.apiUrl + 'fileContent', fileData).then(function (data) {
                return data.status;
            });
        },
        getById : function(id) {
            return $http.get(appConfig.apiUrl + 'note/' + id).then(function (result) {
                return result.data;
            });
        },
        create : function(noteData) {
            return $http.post(appConfig.apiUrl + 'note', noteData).then(function (data) {
                return data.status;
            });
        },
        edit : function(noteData) {
            return $http.put(appConfig.apiUrl + 'note/' + noteData, JSON.stringify(noteData)).then(function (data) {
                return data.status;
            });
        },
        editOrigem : function(noteData) {
            return $http.put(appConfig.apiUrl + 'fileOrigem/' + noteData, JSON.stringify(noteData)).then(function (data) {
                return data.status;
            });
        },
        delete : function(id) {
            return $http.delete(appConfig.apiUrl + 'note/' + id).then(function (data) {
                return data.status;
            });
        }
    }
};
