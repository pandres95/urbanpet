(function () {
    'use strict';

    (angular
        .module('urbanPet.post')
        .service('Post', Post)
    );

    function Post($http, headers, api) {

        this.list = function () {
            return $http({
                method: 'GET',
                url: api.post
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.find = function (id) {
            return $http({
                method: 'GET',
                url: api.postId(id)
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.insert = function (data) {
            return $http({
                method: 'POST',
                url: api.post,
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
                url: api.postId(id),
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
                url: api.postId(id),
                headers: {
                    'Content-Type': headers.json
                }
            }).then(function (res) {
                return res.data.data;
            });
        };
    }

})();
