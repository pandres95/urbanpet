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

        function response(_response) {
            $injector.get('loadingBar').hide();

            if(
                !_response.config.notNotifySuccess &&
                _response.config.method !== 'GET'
            ){
                $injector.get('msg').success(
                    'request.{0}'.format(_response.config.method)
                );
            }

            console.log();

            return _response;
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
