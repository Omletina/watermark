$(function () {

    //Включаем UI объекты определяющие положение и прозрачность водянного(ых) знака
    var moveX = $("#moveX").spinner(),
        moveY = $("#moveY").spinner(),
        marginLeft = $("#margin-left").spinner({
            min: 0
        }),
        marginBottom = $("#margin-bottom").spinner({
            min: 0
        }),
        opacity = $("#opacity").slider({
            range: "min",
            value: 100,
            orientation: "horizontal",
            slide: refreshOpacity,
            change: refreshOpacity
        });

    //Переключение между режимами отображения водяного знака (один или мульти)
    $(".placement-select__item").on("click", function () {
        var id = $(this).data('select-placement');

        $this = $(this);
        $(id).addClass('active').siblings('.position-select').removeClass('active');
        $this.addClass('active').siblings('.placement-select__item').removeClass('active');

        var imgFile = '/img/watermark.jpg'; // todo - это значение надо инизиализировать при загрузке изображения

        if($this.hasClass('placement-select__item_multi')){
            watermark.init(imgFile, 'multy');
            $('input[name=mode]').val('multy');
        }else{
            watermark.init(imgFile);
            $('input[name=mode]').val('single');
        }

    });

    //Отображаем в кастомном инпуте имя загруженного файла
    $('input[type=file]').change(function() {
        var input = $(this).data('download-file'),
            filename = $(this).val().split('\\').pop();

        $(input).val( filename ); // Set the value
    });

    //Меняем размеры дивов которые визуализируют отступы между водяными знаками в режиме "Замостить"
    marginLeft.on( "spin", function( event, ui ) {

        var marginLeftVal = ui.value;

        $('.choose-position__margin_left').css({
            'width': marginLeftVal,
            'margin-left': -marginLeftVal/2
        });

        watermark.setRightMargin(marginLeftVal);

        $('input[name=x_margin]').val(marginLeftVal);
    } );
    marginBottom.on( "spin", function( event, ui ) {

        var marginBottomVal = ui.value;

        $('.choose-position__margin_bottom').css({
            'height': marginBottomVal,
            'margin-top': -marginBottomVal/2
        });

        watermark.setBottomMargin(marginBottomVal);

        $('input[name=y_margin]').val(marginBottomVal);
    } );

    function refreshOpacity(){
        var opacity = $("#opacity").slider('value')/100;
        $('.watermark').css({'opacity': opacity});

        $('input[name=opacity]').val(opacity);
    }


    $('.form').on('submit', function(e){

        if(watermark){
            var coords = watermark.getCoords();
            $('input[name=x]').val(coords.x);
            $('input[name=y]').val(coords.y);
        }

        // для отладки - можно потом удалить
        console.log('x: '       +$('input[name=x]').val());
        console.log('y: '       +$('input[name=y]').val());
        console.log('x_margin: '+$('input[name=x_margin]').val());
        console.log('y_margin: '+$('input[name=y_margin]').val());
        console.log('opacity: ' +$('input[name=opacity]').val());
        console.log('mode: '    +$('input[name=mode]').val());

        e.preventDefault(e);
    });
});