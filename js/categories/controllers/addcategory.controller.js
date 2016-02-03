(function () {
    'use strict';

    (angular
        .module('urbanPet.category')
        .controller('AddCategoryController', AddCategoryController)
    );

    function AddCategoryController($scope, $mdDialog, $mdToast, Category) {

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
                Category.insert(category).then(function () {
                    if($scope.file) {
                        return Category.uploadImage(category._id, $scope.file);
                    }
                }).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Categoría creada exitosamente')
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

        $scope.edit = false;
        $scope.category = { };
    }

})();
