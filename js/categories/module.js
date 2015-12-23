(function () {
    'use strict';

    (angular
        .module('urbanPet.category', ['ui.router'])
        .config(Configure)
    ).run(Run);

    function Configure($stateProvider) {


        $stateProvider.state('user', {
            abstract: true,
            url: '',
            templateUrl: 'views/user.tpl.html'
        })
        .state('user.categories', {
            url: '/categories',
            controller: 'CategoryController as vm',
            templateUrl: 'views/categories/category.tpl.html'
        })
        .state('user.stores', {
            url: '',
            controller: 'StoreController as vm',
            templateUrl: 'views/stores/store.tpl.html'
        });
    }

    function Run() {
    }

})();
