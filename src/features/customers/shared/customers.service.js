/* @ngInject */
module.exports = function customersService(appConfig, $http, nddQueryGeneratorFactory) {
    return {
        getAllCustomers: getAllCustomers,
        getById: getById,
        addCustomer: addCustomer,
        removeCustomer: removeCustomer,
        editCustomer: editCustomer
    };

    function getAllCustomers(parms) {
        return $http.get(appConfig.apiUrl + 'customers' + query).then(function (result) {
            return result.data.items;
        });
    }

    function getById(id) {
        return $http.get(appConfig.apiUrl + 'customers/' + id).then(function (result) {
            return result.data;
        });
    }

    function addCustomer(customer) {
        return $http.post(appConfig.apiUrl + 'customers', customer).then(function (data) {
            return data.status;
        });
    }

    function editCustomer(customer) {
        return $http.put(appConfig.apiUrl + 'customers', JSON.stringify(customer)).then(function (data) {
            return data.status;
        });
    }

    function removeCustomer(id) {
        return $http.delete(appConfig.apiUrl + 'customers/' + id).then(function (data) {
            return data.status;
        });
    }
};
