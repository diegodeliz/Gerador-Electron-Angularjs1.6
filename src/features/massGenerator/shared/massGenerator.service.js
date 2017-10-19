/* @ngInject */
module.exports = function massGeneratorService(appConfig, $http, nddQueryGeneratorFactory) {
    return {
        getAllmassGenerator: getAllmassGenerator,
        getById: getById,
        addmassGenerator: addmassGenerator,
        removemassGenerator: removemassGenerator,
        editmassGenerator: editmassGenerator
    };

    function getAllmassGenerator(parms) {
        return $http.get(appConfig.apiUrl + 'massGenerator' + query).then(function (result) {
            return result.data.items;
        });
    }

    function getById(id) {
        return $http.get(appConfig.apiUrl + 'massGenerator/' + id).then(function (result) {
            return result.data;
        });
    }

    function addmassGenerator(massGenerator) {
        return $http.post(appConfig.apiUrl + 'massGenerator', massGenerator).then(function (data) {
            return data.status;
        });
    }

    function editmassGenerator(massGenerator) {
        return $http.put(appConfig.apiUrl + 'massGenerator', JSON.stringify(massGenerator)).then(function (data) {
            return data.status;
        });
    }

    function removemassGenerator(id) {
        return $http.delete(appConfig.apiUrl + 'massGenerator/' + id).then(function (data) {
            return data.status;
        });
    }
};
