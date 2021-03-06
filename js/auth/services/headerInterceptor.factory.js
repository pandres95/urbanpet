(function() { /* jshint camelcase:false */
    'use strict';

    angular
    .module('urbanPet.auth')
    .factory('HeaderInterceptor', HeaderInterceptor);

    HeaderInterceptor.$inject = ['$injector', '$q'];

    /* @ngInject */
    function HeaderInterceptor($injector , $q) {
        var service = {
            request: function(config) {
                var api = $injector.get('api');

                if(!config.headers['Authorization'] && config.url.includes(api.host) && !config.dontAuth){

                    var headers = $injector.get('headers');
                    var token   = $injector.get('Auth').userLogged();

                    config.headers['Authorization'] = headers.authorization(
                        token.token_type, token.access_token
                    );
                }

                return config;
            }
        };

        return service;
    }
})();
