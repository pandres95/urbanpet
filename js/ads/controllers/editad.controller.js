(function () {
    'use strict';

    (angular
        .module('urbanPet.ad')
        .controller('EditAdController', EditAdController)
    );

    function EditAdController($scope, $mdDialog, $mdToast, Ad, adId) {

        $scope.name = '';
        $scope.url = {
            protocol: 'http',
            path: ''
        };
        $scope.image = '';
        $scope.file = false;

        $scope.manageAd = function(){
            if($scope.name && $scope.url){
                $scope.url = '{0}://{1}'.format(
                    $scope.url.protocol, $scope.url.path
                );
                Ad.update(
                    adId, $scope.name, $scope.url, $scope.file || $scope.image
                ).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Anuncio editado exitosamente')
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                });
            } else {
                $mdToast.show($mdToast
                    .simple()
                    .content('El nombre y la url son obligatorios')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        };

        function construct() {
            return Ad.find(adId).then(function (ad) {
                $scope.name = ad.name;
                var urldecomposed = ad.url.split('://');
                $scope.url = {
                    protocol: urldecomposed[0],
                    path: urldecomposed[1]
                };
                $scope.image = ad.image;
            });
        }

        construct();

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = true;
    }

})();
