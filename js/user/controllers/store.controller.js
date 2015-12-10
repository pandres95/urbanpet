(function () {
    'use strict';

    (angular
        .module('urbanPet.user')
        .controller('StoreController', StoreController)
    );

    function StoreController(Store, $mdBottomSheet, $mdDialog) {
        var vm = this;

        construct();

        function construct() {
            Store.list().then(function(data){ vm.stores = data.reverse(); });
        }

        vm.addNote = function($event) {
            $mdDialog.show({
                controller: 'AddStoreController',
                templateUrl: 'views/add-store.tpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                onComplete: construct
            }).then(function(data){
                construct();
            }, function(){
                construct();
            });
        };

        vm.editStore = function ($event, item) {
            $mdDialog.show({
                controller: 'EditStoreController',
                templateUrl: 'views/edit-store.tpl.html',
                parent: angular.element(document.body),
                locals: {
                    store: item
                },
                targetEvent: $event,
                clickOutsideToClose: true,
                onComplete: construct
            }).then(function(data){
                construct();
            }, function(){
                construct();
            });
        };

        vm.removeStore = function($event, id) {
            Store.delete(id).then(function(){ construct(); });
        };
    }

})();
