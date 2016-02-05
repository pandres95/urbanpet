(function () {
    'use strict';

    (angular
        .module('urbanPet.store')
        .controller('StoreController', StoreController)
    );

    function StoreController(
        $rootScope, $mdBottomSheet, $mdDialog, Category, Store
    ) {
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

        function construct() {
            Store.list({
                limit: 10,
                skip: $rootScope.offset
            }).then(function(data) {
                $rootScope.dataLength = data.lenght;
                vm.stores = data.reverse();
            });
        }

        function getCategories() {
            return Category.ilist().then(function (categories) {
                return categories.map(function (category) {
                    category._lowername = category.name.toLowerCase();
                    return category;
                });
            });
        }

        vm.addStore = function($event) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'AddStoreController',
                    templateUrl: 'views/stores/manage-store.tpl.html',
                    locals: {
                        categories: categories
                    },
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: construct
                }).then(function(data){
                    construct();
                }, function(){
                    construct();
                });
            });
        };

        vm.editStore = function ($event, item) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'EditStoreController',
                    templateUrl: 'views/stores/manage-store.tpl.html',
                    parent: angular.element(document.body),
                    locals: {
                        categories: categories,
                        storeId: item._id
                    },
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: construct
                }).then(function(data){
                    construct();
                }, function(){
                    construct();
                });
            });
        };

        vm.removeStore = function($event, id) {
            Store.delete(id).then(function(){ construct(); });
        };

        $rootScope.title = 'Lugares';
    }

})();
