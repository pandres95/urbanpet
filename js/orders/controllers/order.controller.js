(function () {
    'use strict';

    (angular
        .module('urbanPet.order')
        .controller('OrderController', OrderController)
    );

    function OrderController($rootScope, $mdToast, Order) {
        var vm = this;

        construct();

        function construct(modified) {
            if(modified){
                $mdToast.show($mdToast
                    .simple()
                    .content('Orden modificada exitosamente')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
            Order.list().then((data) => { vm.orders = data.reverse(); });
        }

        vm.progress = function($event, id) {
            Order.changeStatus(id, 'in-progress').then(construct);
        };

        vm.deliver = function ($event, id) {
            Order.changeStatus(id, 'delivered').then(construct);
        };

        $rootScope.title = 'Ordenes';
    }

})();
