(function () {
    'use strict';

    (angular
        .module('urbanPet.category')
        .controller('CategoryController', CategoryController)
    );

    function CategoryController(Category, $log, $mdBottomSheet, $mdDialog) {
        var vm = this;

        function construct() {
            Category.list().then((data) => { vm.categories = data; });
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

    }

})();
