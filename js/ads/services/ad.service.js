(function () {
    'use strict';

    (angular
        .module('urbanPet.ad')
        .service('Ad', Ad)
    );

    function Ad($http, Upload, api) {

        this.list = function () {
            return $http({
                method: 'GET',
                url: api.ad
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.find = function (id) {
            return $http({
                method: 'GET',
                url: api.adId(id)
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.insert = function (name, url, file) {
            return Upload.upload({
                url: api.ad,
                data: {
                    name: name,
                    url: url,
                    file: file
                }
            });
        };

        this.update = function (id, name, url, file) {
            return Upload.upload({
                method: 'PUT',
                url: api.adId(id),
                data: {
                    name: name,
                    url: url,
                    file: file
                }
            });
        };

        this.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: api.adId(id)
            });
        };

    }

})();
