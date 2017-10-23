/* @ngInject */
module.exports = function massGeneratorService(appConfig, $http, nddQueryGeneratorFactory) {
    return {
        getAllMassGenerator: getAllMassGenerator,
        getById: getById,
        addMassGenerator: addMassGenerator,
        removeMassGenerator: removeMassGenerator,
        editMassGenerator: editMassGenerator
    };

    function getAllMassGenerator(parms) {
        return $http.get(appConfig.apiUrl + 'massGenerator' + query).then(function (result) {
            return result.data.items;
        });
    }

    function getById(id) {
        return $http.get(appConfig.apiUrl + 'massGenerator/' + id).then(function (result) {
            return result.data;
        });
    }

    function addMassGenerator(massGenerator) {
        return $http.post(appConfig.apiUrl + 'massGenerator', massGenerator).then(function (data) {
            return data.status;
        });
    }

    function editMassGenerator(massGenerator) {
        return $http.put(appConfig.apiUrl + 'massGenerator', JSON.stringify(massGenerator)).then(function (data) {
            return data.status;
        });
    }

    function removeMassGenerator(id) {
        return $http.delete(appConfig.apiUrl + 'massGenerator/' + id).then(function (data) {
            return data.status;
        });
    }
};
