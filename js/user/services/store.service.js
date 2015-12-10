(function () {
    'use strict';

    (angular
        .module('urbanPet.user')
        .service('Store', Store)
    );

    function Store($http, headers, api) {

        this.list = function () {
            return $http({
                method: 'GET',
                url: api.store
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.near = function (lng, lat, min, max) {
            return $http({
                method: 'GET',
                url: api.store,
                params: {
                    lng: lng,
                    lat: lat,
                    minDistance: min,
                    maxDistance: max
                }
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.find = function (id) {
            return $http({
                method: 'GET',
                url: api.storeId(id)
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.insert = function (data) {
            return $http({
                method: 'POST',
                url: api.store,
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
                url: api.storeId(id),
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
                url: api.storeId(id),
                headers: {
                    'Content-Type': headers.json
                }
            }).then(function (res) {
                return res.data.data;
            });
        };
    }

})();
