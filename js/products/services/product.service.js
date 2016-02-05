(function() {
    'use strict';

    (angular
        .module('urbanPet.product')
        .service('Product', Product)
    );

    function Product(_, $http, api, headers) {

        this.list = function (storeId, params) {
            return $http({
                method: 'GET',
                url: api.product,
                params: _.extend({
                    store: storeId
                }, params)
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.find = function (id) {
            return $http({
                method: 'GET',
                url: api.productId(id)
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
