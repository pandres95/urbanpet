(function () {
    'use strict';

    (angular
        .module('urbanPet.store')
        .controller('StoreController', StoreController)
    );

    function StoreController(Category, Store, $mdBottomSheet, $mdDialog) {
        var vm = this;

        construct();

        function construct() {
            Store.list().then(function(data){ vm.stores = data.reverse(); });
        }

        function getCategories() {
            return Category.list().then(function (categories) {
                return categories.map(function (category) {
                    category._lowername = category.name.toLowerCase();
                    return category;
                });
            });
        }

        vm.addNote = function($event) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'AddStoreController',
                    templateUrl: 'views/manage-store.tpl.html',
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
                    templateUrl: 'views/manage-store.tpl.html',
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
    }

})();
