(function() {
    'use strict';

    angular
        .module('urbanPet.product')
        .controller('ProductController', ProductController);

    function ProductController(
        $rootScope, $state, $mdDialog, Category, Store, Product
    ) {
        var vm = this;

        vm.storeId = $state.params.id;

        $rootScope.offset = 0;

        $rootScope.goBack = function () {
            if($rootScope.offset > 0) {
                $rootScope.offset -= 10;
            }
            activate();
        };

        $rootScope.goForward = function () {
            $rootScope.offset += 10;
            activate();
        };

        activate();

        function activate() {
            Store.find(vm.storeId).then(function (store) {
                $rootScope.title = '{0} - Productos'.format(store.name);
            });
            Product.list(vm.storeId, {
                limit: 10,
                skip: $rootScope.offset
            }).then(function (list) {
                vm.products = list;
            });
        }

        function getCategories(){
            return Category.ilist({}, true);
        }

        vm.addProduct = function($event) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'AddProductController',
                    templateUrl: 'views/products/manage-product.tpl.html',
                    locals: {
                        storeId: vm.storeId,
                        categories: categories
                    },
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: activate
                }).then(function(data){
                    activate();
                }, function(){
                    activate();
                });
            });
        };

        vm.editProduct = function ($event, item) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'EditProductController',
                    templateUrl: 'views/products/manage-product.tpl.html',
                    parent: angular.element(document.body),
                    locals: {
                        categories: categories,
                        productId: item._id
                    },
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: activate
                }).then(function(data){
                    activate();
                }, function(){
                    activate();
                });
            });
        };

        vm.deleteProduct = function ($event, item) {
            Product.delete(item._id).then(function () {
                activate();
            });
        };

    }
})();
