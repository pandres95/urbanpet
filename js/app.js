(function(){
    'use strict';

    (angular
        .module('urbanPet', [
            'ui.router', 'ngMaterial', 'urbanPet.user', 'urbanPet.store'
        ])
        .config(Config)
        .run(Run)
    );

    function Config($stateProvider, $mdThemingProvider) {

        ($mdThemingProvider
            .theme('default')
            .primaryPalette('orange')
            .accentPalette('red')
        );

        $stateProvider.state('home', {
            url: '',
            controller: 'StoreController as vm',
            templateUrl: 'views/store.tpl.html'
        });

    }

    function Run() {

    }

})();
