(function(){

    angular
        .module('urbanPet')
        .value('imgUrlBase', 'https://api.somosurbanpet.com/static')
        .filter('image', image);

    function image(imgUrlBase) {
        return function(img){
            return '{0}/{1}'.format(imgUrlBase, img);
        };
    }
})();
