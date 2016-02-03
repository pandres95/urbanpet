(function () {
    'use strict';

    (angular
        .module('urbanPet.order')
        .controller('OrderController', OrderController)
    );

    function OrderController(_, $q, $rootScope, $mdToast, Store, Order) {
        var vm = this;

        $rootScope.offset = 0;

        $rootScope.goBack = function () {
            if($rootScope.offset > 0) {
                $rootScope.offset -= 10;
            }
            construct();
        };

        $rootScope.goForward = function () {
            $rootScope.offset += 10;
            construct();
        };

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
            Order.list({
                limit: 10,
                skip: $rootScope.offset
            }).then(function(data) {
                $rootScope.dataLength = data.lenght;

                var batch = [];

                function fetchOrderStore(order) {
                    if(order.orderDetail.length > 0){
                        batch.push(Store.find(
                            order.orderDetail[0].product._store
                        ).then(function (store) {
                            order.store = store;
                            return order;
                        }));
                    }
                }

                for(var i = 0; i < data.length; i++){
                    fetchOrderStore(data[i]);
                }

                return $q.all(batch);
            }).then(function (data) {

                function setOrderTotal(order) {
                    console.log(order.orderDetail);
                    order.total = _.reduce(order.orderDetail, function (x, d) {
                        console.log(x);
                        return x + (d.product.unitPrice * d.quantity);
                    }, 0);
                    return order;
                }

                for(var i = 0; i < data.length; i++){
                    data[i] = setOrderTotal(data[i]);
                }

                vm.orders = data.reverse();
            });
        }

        vm.send = function($event, id) {
            Order.changeStatus(id, 'sent').then(construct);
        };

        vm.reject = function ($event, id) {
            Order.changeStatus(id, 'rejected').then(construct);
        };

        $rootScope.title = 'Ordenes';
    }

})();
