(function(){
    'use strict';

    (angular
        .module('urbanPet', [
            'ui.router', 'ngMaterial', 'ngUnderscore', 'ngFileUpload',
            'btford.markdown',

            'urbanPet.ad', 'urbanPet.store', 'urbanPet.category',
            'urbanPet.auth', 'urbanPet.order', 'urbanPet.post'
        ])
        .config(Config)
        .run(Run)
    );

    function Config($stateProvider, $mdThemingProvider, $httpProvider) {

        $httpProvider.interceptors.push('ErrorInterceptor');

        ($mdThemingProvider
            .theme('default')
            .primaryPalette('orange')
            .accentPalette('red')
        );

        $stateProvider.state('user', {
            abstract: true,
            url: '/user',
            templateUrl: 'views/user.tpl.html'
        })
        .state('user.ads', {
            url: '/ads',
            controller: 'AdController as vm',
            templateUrl: 'views/ads/ad.tpl.html'
        })
        .state('user.categories', {
            url: '/categories',
            controller: 'CategoryController as vm',
            templateUrl: 'views/categories/category.tpl.html'
        })
        .state('user.orders', {
            url: '/orders',
            controller: 'OrderController as vm',
            templateUrl: 'views/orders/order.tpl.html'
        })
        .state('user.stores', {
            url: '/stores',
            controller: 'StoreController as vm',
            templateUrl: 'views/stores/store.tpl.html'
        })
        .state('user.products', {
            url:'/stores/:id/products',
            controller: 'ProductController as vm',
            templateUrl: 'views/stores/product.tpl.html'
        })
        .state('user.posts', {
            url: '/posts',
            controller: 'PostController as vm',
            templateUrl: 'views/posts/post.tpl.html'
        });

    }

    function Run() {

    }

})();
