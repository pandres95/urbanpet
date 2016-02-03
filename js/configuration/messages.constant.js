(function () {
    'use strict';

    var messages = {
        success: {
            'app.product': 'Producto agregado correctamente',
            'request.POST': 'Agregado correctamente',
            'request.PUT': 'Actualizado correctamente',
            'request.DELETE': 'Eliminado correctamente'
        },
        error: {
            'app.geolocation': 'Hubo un error con tu ubicación',
            'app.product': 'Debe ser un artículo de la misma tienda',
            'request.default': 'Error comunicándonos con el servidor'
        }
    };

    angular
    .module('urbanPet')
    .constant('messages', messages);

})();
