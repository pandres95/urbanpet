(function () {
    'use strict';

    (angular
        .module('urbanPet.order')
        .service('Order', Order)
    );

    function Order($http, api, headers) {

        this.list = function (params) {
            return $http({
                method: 'GET',
                url: api.order,
                params: params
            }).then(function (res) {
                return res.data.data;
            });
        };

        this.changeStatus = function (id, status) {
            return $http({
                method: 'PUT',
                url: api.orderId(id),
                data: {
                    orderStatus: status
                }
            });
        };

    }

})();
