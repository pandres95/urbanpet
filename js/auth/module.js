(function() {
    'use strict';

    angular
    .module('urbanPet.auth', ['LocalStorageModule'])
    .config(config)
    .run(run);

    function config($stateProvider, $httpProvider) {

        $httpProvider.interceptors.push('HeaderInterceptor');

        $stateProvider
        .state('login', {
            url: '',
            templateUrl: 'views/auth/login.tpl.html',
            controller: 'AuthController',
            controllerAs: 'vm',
            data:{
                role: 4
            }
        });
    }

    function run($rootScope, Auth, $state) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
            if(!toState.data){
                toState.data = {role: 8};
            }

            if(toState.data.role !== 2){

                if(toState.data.role !== 4 && !Auth.userLogged()){
                    event.preventDefault();
                    if(toState.name === 'user.stores'){
                        $state.go('auth');
                    }
                    else {
                        $state.go('user.stores');
                    }
                }

                else if((toState.data.role === 4) && Auth.userLogged()){
                    event.preventDefault();
                    $state.go('user.stores');
                }

            }

        });

    }
})();
