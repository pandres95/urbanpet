(function(){
    'use strict';

    (angular
        .module('urbanPet.store')
        .controller('AddStoreController', AddStoreController)
    );

    function AddStoreController(
        _, $log, $scope, $mdDialog, $mdToast, Store, categories
    ) {
        var vmd = this;

        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.categories = categories;

        $scope.transformChip = function(chip) {
            $log.log(chip, angular.isObject(chip));
            if(angular.isObject(chip)){
                return chip;
            }
            $log.log(_($scope.categories).findWhere({ _id: chip }));
            return _($scope.categories).findWhere({ _id: chip });
        };

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
            switch($scope.type){
                case 'venue': {
                    store.isStore = false;
                    store.isService = false;
                    break;
                }
                case 'store': {
                    store.isStore = true;
                    store.isService = false;
                    break;
                }
                case 'service': {
                    store.isStore = false;
                    store.isService = true;
                    break;
                }
                default: {
                    store.isStore = false;
                    store.isService = false;
                    break;
                }
            }
            if(store.name && store.description){
                store.categories = store.categories.map(function (category) {
                    return category._id;
                });
                Store.insert(store).then(function (store) {
                    if($scope.file){
                        return Store.uploadImage(store._id, $scope.file);
                    }
                }).then(function(){
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
            isStore: false,
            categories: []
        };
    }
})();
