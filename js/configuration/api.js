(function () {
    'use strict';

    var apiRouter = {
        url: {
            protocol: 'https',
            host: 'urbanpet.herokuapp.com'
        },
        route: function(path){
            var url = this.url;
            return '{0}://{1}/{2}'.format(url.procotol, url.host, path);
        },
        id: function(path){
            var prePath = apiRouter.route(path);
            return function (id) {
                return '{0}/{1}'.format(prePath, id);
            };
        }
    };

    var api = {
        host: apiRouter.url.host,
        id: apiRouter.id,
        // Store
        store: apiRouter.route('venues'),
        storeId: apiRouter.id('venues'),
        // Category
        category: apiRouter.route('categories'),
        categoryId: apiRouter.id('categories'),
        // Auth
        token: apiRouter.route('auth/token'),
        // Ad
        ad: apiRouter.route('ads'),
        adId: apiRouter.id('ads'),
        // Order
        order: apiRouter.route('orders'),
        orderId: apiRouter.id('orders'),
        // Post
        post: apiRouter.route('posts'),
        postId: apiRouter.id('posts'),
        // Product
        product: apiRouter.route('products'),
        productId: apiRouter.id('products')
    };

    (angular
        .module('urbanPet')
        .constant('api', api)
    );

})();
