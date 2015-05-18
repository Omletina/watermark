var watermark = function () {

    var coords = [];
    var mode    = 'single';

    var init = function ($img, mode) {

        _clear()
        var $elem = $();
        if ($elem.length){
            $elem.draggable({
                containment: "parent",
                stop: _stop
            });
        }
    };
    
    var _stop = function( event, ui ) {

        var pos = ui.position;

        coords.x = pos.left;
        coords.y = pos.top;
    }

    var _initMultyMode = function (){

    }

    var _initSingleMode = function (){

    }

    var _clear = function(){

    }

    var setMode = function(mode){
        switch (mode){
            case 'multy':{
                mode = 'multy';
                _initMultyMode();
                break;
            }

            default:{
                mode = 'single';
                _initSingleMode();
            }
        }

    }

    return {
        init: init,
        setMode: setMode
    };
}();


//watermark.init('');