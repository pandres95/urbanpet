(function(){
    'use strict';

    (angular
        .module('urbanPet.post')
        .controller('EditPostController', EditPostController)
    );

    function EditPostController(
        _, $log, $scope, $mdDialog, $mdToast, Post, categories, postId
    ) {
        var vmd = this;

        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.categories = categories;

        $scope.transformChip = function(chip) {
            if(angular.isObject(chip)){
                return chip;
            }
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

        $scope.managePost = function(post){
            if(post.title && post.description){
                Post.update(postId, post).then(function(){
                    $mdToast.show($mdToast
                        .simple()
                        .content('Publicación actualizada exitosamente')
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
        $scope.post = null;

        construct();

        function construct(){
            Post.find(postId).then(function (post) {
                post.categories = _(post.categories).map(
                    $scope.transformChip
                );
                $scope.post = post;
            });
        }
    }
})();
