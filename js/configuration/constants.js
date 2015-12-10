(function () {
    'use strict';

    (angular
        .module('urbanPet')
        .constant('headers', {
            urlencoded: 'application/x-www-form-urlencoded',
            json: 'application/json',
            authorization: function(t, k) { return `${t} ${k}`; }
        })
    );
})();
