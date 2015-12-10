(function(){
    'use strict';

    (angular
        .module('urbanPet.user')
        .controller('AddStoreController', AddStoreController)
    );

    function AddStoreController($scope, $mdDialog, $mdToast, Store) {
        var vmd = this;
        $scope.store = {
            location: {
                type: 'Point',
                coordinates: [ 0, 0 ]
            }
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.addStore = function(store){
            console.log(store);
            if(store.name && store.description){
                Store.insert(store).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Tienda creada exitosamente')
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
