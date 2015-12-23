(function(){
    'use strict';

    (angular
        .module('urbanPet', [
            'ui.router', 'ngMaterial',
            'urbanPet.store', 'urbanPet.category'
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

    }

    function Run() {

    }

})();
