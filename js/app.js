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

    function Config(
        $stateProvider, $mdThemingProvider, $httpProvider, $mdDateLocaleProvider
    ) {

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

        // Example of a French localization.
        $mdDateLocaleProvider.months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
            'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        $mdDateLocaleProvider.shortMonths = [
            'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep',
            'oct', 'nov', 'dic'
        ];
        $mdDateLocaleProvider.days = [
            'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes',
            'sábado'
        ];
        $mdDateLocaleProvider.shortDays = [
            'dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'
        ];
        // Can change week display to start on Monday.
        $mdDateLocaleProvider.firstDayOfWeek = 1;

        // In addition to date display, date components also need localized messages
        // for aria-labels for screen-reader users.
        $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
            return 'semana ' + weekNumber;
        };
        $mdDateLocaleProvider.msgCalendar = 'Calendario';
        $mdDateLocaleProvider.msgOpenCalendar = 'Abrir el calendario';

    }

    function Run() {

    }

})();
