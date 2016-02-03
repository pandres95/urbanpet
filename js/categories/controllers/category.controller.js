(function () {
    'use strict';

    (angular
        .module('urbanPet.category')
        .controller('CategoryController', CategoryController)
    );

    function CategoryController($rootScope, $mdDialog, Category) {
        var vm = this;

        $rootScope.offset = 0;

        $rootScope.goBack = function () {
            if($rootScope.offset > 0) {
                $rootScope.offset -= 10;
            }
            construct();
        };

        $rootScope.goForward = function () {
            $rootScope.offset += 10;
            construct();
        };

        function construct() {
            Category.list({
                limit: 10,
                skip: $rootScope.offset
            }).then(function(data) {
                $rootScope.dataLength = data.lenght;
                vm.categories = data.reverse();
            });
        }

        vm.addCategory = function ($event) {
            $mdDialog.show({
                controller: 'AddCategoryController',
                templateUrl: 'views/categories/manage-category.tpl.html',
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

        vm.editCategory = function ($event, category) {
            $mdDialog.show({
                controller: 'EditCategoryController',
                templateUrl: 'views/categories/manage-category.tpl.html',
                parent: angular.element(document.body),
                locals: {
                    category: category
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

        construct();

        $rootScope.title = 'Categorias';
    }

})();
