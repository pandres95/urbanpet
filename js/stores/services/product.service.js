(function() {
    'use strict';

    (angular
        .module('urbanPet.store')
        .service('Product', Product)
    );

    function Product($http, api, headers) {

        this.list = function (storeId) {
            return $http({
                method: 'GET',
                url: api.product,
                params: {
                    store: storeId
                }
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.create = function (data) {
            return $http({
                method: 'POST',
                url: api.product,
                headers: {
                    'Content-Type': headers.json
                },
                data: data
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.edit = function (id, data) {
            return $http({
                method: 'PUT',
                url: api.productId(id),
                headers: {
                    'Content-Type': headers.json
                },
                data: data
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: api.productId(id)
            });
        };

    }

})();
