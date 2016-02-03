(function() {
    'use strict';

    angular
        .module('urbanPet')
        .service('loadingBar', loadingBar);

    loadingBar.$inject = ['$rootScope'];

    /* @ngInject */
    function loadingBar($rootScope) {
        this.show = show;
        this.hide = hide;

        function show() {
            $rootScope.loading = true;
        }

        function hide() {
            $rootScope.loading = false;
        }
    }
})();
