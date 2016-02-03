(function() {
    'use strict';

    angular
        .module('urbanPet')
        .factory('ErrorInterceptor', ErrorInterceptor);

    ErrorInterceptor.$inject = ['$q', '$injector' ];

    /* @ngInject */
    function ErrorInterceptor($q, $injector) {
        var service = {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };

        return service;

        function request(config) {
            $injector.get('loadingBar').show();

            return config;
        }

        function requestError(rejection) {

            return $q.reject(rejection);
        }

        function response(response) {
            $injector.get('loadingBar').hide();

            if(!response.config.notNotifySuccess && response.config.method != 'GET'){
                $injector.get('msg').success(`request.${response.config.method}`);
            }

            console.log();

            return response;
        }

        function responseError(rejection) {
            $injector.get('loadingBar').hide();

            if(!rejection.config.notNotify){
                $injector.get('msg').error('request.default');
            }

            return $q.reject(rejection);
        }
    }
})();
