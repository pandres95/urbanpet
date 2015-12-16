(function () {
    'use strict';

    (angular
        .module('urbanPet.user')
        .service('Category', Category)
    );

    function Category($http, headers, api) {

        this.list = function () {
            return $http({
                method: 'GET',
                url: api.category
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.find = function (id) {
            return $http({
                method: 'GET',
                url: api.categoryId(id)
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.insert = function (data) {
            return $http({
                method: 'POST',
                url: api.category,
                headers: {
                    'Content-Type': headers.json
                },
                data: data
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: api.categoryId(id),
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
                url: api.categoryId(id),
                headers: {
                    'Content-Type': headers.json
                }
            }).then(function (res) {
                return res.data.data;
            });
        };
    }

})();
