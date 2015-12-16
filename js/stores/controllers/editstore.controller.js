(function(){
    'use strict';

    (angular
        .module('urbanPet.store')
        .controller('EditStoreController', EditStoreController)
    );

    function EditStoreController(
        $scope, $mdDialog, $mdToast, Store, categories, storeId
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
                Store.update(storeId, store).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Tienda actualizada exitosamente')
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

        $scope.edit = true;
        $scope.store = null;

        construct();

        function construct(){
            Store.find(storeId).then(function (store) {
                $scope.store = store;
            });
        }
    }
})();
