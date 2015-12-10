(function(){
    'use strict';

    (angular
        .module('urbanPet.user')
        .controller('EditStoreController', EditStoreController)
    );

    function EditStoreController(
        $log, $scope, $mdDialog, $mdToast, Store, store
    ) {
        var vmd = this;
        $scope.store = store;

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.editStore = function(store){
            $log.log(store);
            if(store.name && store.description){
                Store.update(store._id, store).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Tienda actualizada exitosamente')
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                });
            } else {
                $mdToast.show($mdToast
                    .simple()
                    .content('El nombre y la descripción son obligatorios')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        };
    }
})();
