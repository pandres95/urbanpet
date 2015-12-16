(function(){
    'use strict';

    (angular
        .module('urbanPet.store')
        .controller('AddStoreController', AddStoreController)
    );

    function AddStoreController(
        $scope, $mdDialog, $mdToast, Store, categories
    ) {
        var vmd = this;

        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.categories = categories;

        $scope.querySearch = function (query) {
            var results = (query ?
                $scope.categories.filter($scope.createFilterFor(query)) :
                []
            );
            return results;
        };

        $scope.createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(category) {
                return (category._lowername.indexOf(lowercaseQuery) !== -1);
            };
        };

        $scope.manageStore = function(store){
            if(store.name && store.description){
                store.categories = store.categories.map(function (category) {
                    return category._id;
                });
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

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = false;
        $scope.store = {
            location: {
                type: 'Point',
                coordinates: [ 0, 0 ]
            },
            categories: []
        };
    }
})();
