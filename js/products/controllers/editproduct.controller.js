(function(){
    'use strict';

    (angular
        .module('urbanPet.product')
        .controller('EditProductController', EditProductController)
    );

    function EditProductController(
        _, $log, $scope, $mdDialog, $mdToast, Product, categories, productId
    ) {
        $scope.categories = categories;

        $scope.manageProduct = function(product){
            if(product.name && product.description && product.unitPrice){
                Product.edit(productId, product).then(function(){
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

        $scope.edit = true;
        $scope.product = null;

        construct();

        function construct(){
            Product.find(productId).then(function (product) {
                $scope.product = product;
            });
        }
    }
})();
