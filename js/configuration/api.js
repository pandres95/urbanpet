(function () {
    'use strict';

    var apiRouter = {
        url: {
            protocol: 'https',
            host: 'urbanpet.herokuapp.com'
        },
        route: function(path){
            var url = this.url;
            return `${url.protocol}://${url.host}/${path}`;
        },
        id: function(path){
            var prePath = apiRouter.route(path);
            return function (id) {
                return `${prePath}/${id}`;
            };
        }
    };

    var api = {

        id: apiRouter.id,
        // Store
        store: apiRouter.route('store'),
        storeId: apiRouter.id('store')
    };

    (angular
        .module('urbanPet')
        .constant('api', api)
    );

})();