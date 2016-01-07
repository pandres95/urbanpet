(function(){
    'use strict';

    (angular
        .module('urbanPet.post')
        .controller('AddPostController', AddPostController)
    );

    function AddPostController(
        _, $log, $scope, $mdDialog, $mdToast, Post, categories
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
            if(post.title && post.content && post.postStatus && post.description){
                Post.insert(post).then(function(){
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
                    .content('El título, la descripción, el estado y el contenido son obligatorios')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        };

        $scope.cancel = function(){
            $mdDialog.cancel();
        };

        $scope.edit = false;
        $scope.post = {
            location: {
                type: 'Point',
                coordinates: [ 0, 0 ]
            },
            isPost: false,
            categories: []
        };
    }
})();
