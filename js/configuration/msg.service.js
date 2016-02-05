(function(){
    'use strict';

    angular
    .module('urbanPet')
    .service('msg', Msg);

    function Msg(messages, $mdToast) {
        var position = 'bottom left';

        this.success = function(message){
            this.show(
                'Éxito',
                (messages.success[message] &&
                    messages.success[message]
                ) || 'Realizado correctamente'
            );
        };

        this.error = function(message){
            this.show(
                'Error',
                (messages.error[message] &&
                    messages.error[message]
                ) || 'Hubo un error en la aplicación'
            );
        };

        this.show = function(title, message){
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position(position)
                .hideDelay(3000)
            );
        };
    }
})();
