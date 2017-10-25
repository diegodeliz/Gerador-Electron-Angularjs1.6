/* @ngInject */
module.exports = function generatorsService(appConfig, $http, nddQueryGeneratorFactory) {
    return {
        getAllGenerators: getAllGenerators,
        getById: getById,
        addGenerator: addGenerator,
        removeGenerator: removeGenerator,
        editGenerator: editGenerator
    };

    function getAllGenerators(parms) {
        return $http.get(appConfig.apiUrl + 'generators' + query).then(function (result) {
            return result.data.items;
        });
    }

    function getById(id) {
        return $http.get(appConfig.apiUrl + 'generators/' + id).then(function (result) {
            return result.data;
        });
    }

    function addGenerator(generator) {
        return $http.post(appConfig.apiUrl + 'generators', generator).then(function (data) {
            return data.status;
        });
    }

    function editGenerator(generator) {
        return $http.put(appConfig.apiUrl + 'generators', JSON.stringify(generator)).then(function (data) {
            return data.status;
        });
    }

    function removeGenerator(id) {
        return $http.delete(appConfig.apiUrl + 'generators/' + id).then(function (data) {
            return data.status;
        });
    }
};
