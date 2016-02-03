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

        $scope.states = [
            {
                id: 'draft',
                name: 'Borrador'
            },
            {
                id: 'published',
                name: 'Publicado'
            }
        ];

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
                }).then(function () {
                    if($scope.file){
                        return Post.uploadImage(postId, $scope.file);
                    }
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
                $scope.post = post;
            });
        }
    }
})();
