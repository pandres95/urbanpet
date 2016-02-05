(function(){
    'use strict';

    (angular
        .module('urbanPet.product')
        .controller('AddProductController', AddProductController)
    );

    function AddProductController(
        _, $log, $scope, $mdDialog, $mdToast, Product, categories, storeId
    ) {
        $scope.categories = categories;

        $scope.manageProduct = function(product){
            if(product.name && product.description && product.unitPrice){
                Product.create(product).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Producto actualizado exitosamente')
                        .position('bottom left')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                });
            } else {
                $mdToast.show($mdToast
                    .simple()
                    .content('El nombre y la descripción son obligatorios')
                    .position('bottom left')
                    .hideDelay(3000)
                );
            }
        };

        $scope.addDetail = function () {
            $scope.product.details.push({
                options: []
            });
        };

        $scope.deleteDetail = function ($event, detail) {
            $scope.product.details = (_.
                difference($scope.product.details, [ detail ])
            );
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = false;

        construct();

        function construct(){
            $scope.product = {
                _store: storeId,
                details: []
            };
        }
    }
})();
