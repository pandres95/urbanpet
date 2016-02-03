(function () {
    'use strict';

    (angular
        .module('urbanPet.category')
        .controller('EditCategoryController', EditCategoryController)
    );

    function EditCategoryController(
        $scope, $mdDialog, $mdToast, Category, category
    ) {

        $scope.manageCategory = function(category){
            if(category._id && category.name){
                switch($scope.type){
                    case 'product': {
                        category.isProduct = true;
                        break;
                    }
                    case 'venue': {
                        category.isProduct = false;
                        break;
                    }
                }
                Category.update(category._id, category).then(function(){
                    if($scope.file) {
                        return Category.uploadImage(category._id, $scope.file);
                    }
                }).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Categoría modificada exitosamente')
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $mdDialog.hide();
                });
            } else {
                $mdToast.show($mdToast
                    .simple()
                    .content('El ID y nombre son obligatorios')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = true;
        $scope.category = category;
        $scope.type = ($scope.category.isProduct && 'product') || 'venue';
    }

})();
