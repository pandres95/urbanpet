(function () {
    'use strict';

    (angular
        .module('urbanPet.ad')
        .controller('AddAdController', AddAdController)
    );

    function AddAdController($scope, $mdDialog, $mdToast, Ad) {

        $scope.name = '';
        $scope.url = {
            protocol: 'http',
            path: ''
        };
        $scope.file = false;

        $scope.manageAd = function(){
            if($scope.name && $scope.url && $scope.file){
                $scope.url = '{0}://{1}'.format(
                    $scope.url.protocol, $scope.url.path
                );
                Ad.insert(
                    $scope.name, $scope.url, $scope.file
                ).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Anuncio creado exitosamente')
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                });
            } else {
                $mdToast.show($mdToast
                    .simple()
                    .content('El nombre, la url y la imagen son obligatorios')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = false;
    }

})();
