(function () {
    'use strict';

    (angular
        .module('urbanPet.post')
        .controller('PostController', PostController)
    );

    function PostController(
        $rootScope, $mdBottomSheet, $mdDialog, Category, Post
    ) {
        var vm = this;

        construct();

        function construct() {
            Post.list().then((data) => { vm.posts = data.reverse(); });
        }

        function getCategories() {
            return Category.list().then(function (categories) {
                return categories.map(function (category) {
                    category._lowername = category.name.toLowerCase();
                    return category;
                });
            });
        }

        vm.addPost = function($event) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'AddPostController',
                    templateUrl: 'views/posts/manage-post.tpl.html',
                    locals: {
                        categories: categories
                    },
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: construct
                }).then(function(data){
                    construct();
                }, function(){
                    construct();
                });
            });
        };

        vm.editPost = function ($event, item) {
            return getCategories().then(function (categories) {
                $mdDialog.show({
                    controller: 'EditPostController',
                    templateUrl: 'views/posts/manage-post.tpl.html',
                    parent: angular.element(document.body),
                    locals: {
                        categories: categories,
                        postId: item._id
                    },
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    onComplete: construct
                }).then(function(data){
                    construct();
                }, function(){
                    construct();
                });
            });
        };

        vm.removePost = function($event, id) {
            Post.delete(id).then(function(){ construct(); });
        };

        $rootScope.title = 'Publicaciones';
    }

})();
