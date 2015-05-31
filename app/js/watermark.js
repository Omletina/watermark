var watermark = function () {

    var coords      = [];
    var mode        = 'single';
    var wm_class    = 'watermark';
    var wm_src      = '';


    /*
     * @params
     * src: путь до картинки
     * mode: режит - multy- замостить, single - одиночная вотермарка
     * */
    var init = function (src, mode) {
        wm_src = src;
        _clear();


        if(mode == 'multy'){
            _initMultyMode();
        }else{
            _initSingleMode();
        }

    };



    var _stop = function( event, ui ) {

        var pos = ui.position;

        coords.x = pos.left;
        coords.y = pos.top;
    }

    var getCoords = function(){
        return {x: coords.x, y: coords.y}
    }

    var _clear = function(){
        coords.x = 0;
        coords.y = 0;
        $('.'+wm_class).remove();
    }

    /*
     * Устанавливает расстояние у вотермарок по горизонтале
     * */
    var setRightMargin = function(val){
        $('.'+wm_class+' img').css({'margin-right':val+'px'});
    }

    /*
     * Устанавливает расстояние у вотермарок по вертикали
     * */
    var setBottomMargin = function(val){
        $('.'+wm_class+' img').css({'margin-bottom':val+'px'});
    }

    var _initSingleMode = function(){

        var $draggable_elem = _getDraggableElem();
        var $img = _getWmImg()
        $draggable_elem.append($img);

        $draggable_elem.appendTo('.aim-img');

        $draggable_elem.draggable({
            /*containment: "parent",*/
            stop: _stop
        });
    }

    var _initMultyMode = function(){

        var $draggable_elem = _getDraggableElem('multy');
        var $img            = _getWmImg();

        for(i = 0; i<1000; i++){
            $draggable_elem.append($img.clone());
        }

        $draggable_elem.appendTo('.aim-img');
        $draggable_elem.draggable({
            stop: _stop
        });
    }

    var _getDraggableElem = function(add_class){
        return $('<div class="'+wm_class+' '+add_class+'"></div>');
    }

    var _getWmImg = function(){
        return $('<img class="wm_image" src="'+wm_src+'">');
    }

    var getSize = function(){
        var $img = $('.'+wm_class+' img:first-child');
        
        return {
            w: $img[0].width,
            h: $img[0].height
        };

    }

    var setPosition = function(coords){

        var $img = $('.'+wm_class+' img:first-child');

        $img.css({'left': coords.x, 'top': coords.y, 'position': 'absolute'});

    }

    return {
        init:               init,
        setRightMargin:     setRightMargin,
        setBottomMargin:    setBottomMargin,
        getCoords:          getCoords,
        getSize:            getSize,
        setPosition:        setPosition
    };
}();





