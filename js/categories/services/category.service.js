(function () {
    'use strict';

    (angular
        .module('urbanPet.category')
        .service('Category', Category)
    );

    function Category($http, Upload, headers, api) {

        this.list = function (params) {
            return $http({
                method: 'GET',
                url: api.category,
                params: params
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

        this.uploadImage = function (id, image) {
            return Upload.upload({
                method: 'PUT',
                url: api.uploadCategory(id),
                data: {
                    file: image
                }
            }).then(function (res) {
                return res.data.data;
            });
        };
    }

})();
