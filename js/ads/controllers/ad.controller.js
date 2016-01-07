(function () {
    'use strict';

    (angular
        .module('urbanPet.ad')
        .controller('AdController', AdController)
    );

    function AdController($rootScope, $mdDialog, Ad) {
        var vm = this;

        construct();

        function construct() {
            Ad.list().then((data) => { vm.ads = data.reverse(); });
        }

        vm.addAd = function($event) {
            $mdDialog.show({
                controller: 'AddAdController',
                templateUrl: 'views/ads/manage-ad.tpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                onComplete: construct
            }).then(function(data){
                construct();
            }, function(){
                construct();
            });
        };

        vm.editAd = function ($event, item) {
            $mdDialog.show({
                controller: 'EditAdController',
                templateUrl: 'views/ads/manage-ad.tpl.html',
                parent: angular.element(document.body),
                locals: {
                    adId: item._id
                },
                targetEvent: $event,
                clickOutsideToClose: true,
                onComplete: construct
            }).then(function(data){
                construct();
            }, function(){
                construct();
            });
        };

        vm.removeAd = function($event, id) {
            Ad.delete(id).then(function(){ construct(); });
        };

        $rootScope.title = 'Anuncios';
    }

})();
