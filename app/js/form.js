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
        }else{
            watermark.init(imgFile);
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
    } );
    marginBottom.on( "spin", function( event, ui ) {

        var marginBottomVal = ui.value;

        $('.choose-position__margin_bottom').css({
            'height': marginBottomVal,
            'margin-top': -marginBottomVal/2
        });

        watermark.setBottomMargin(marginBottomVal);
    } );

    function refreshOpacity(){
        $('.watermark').css({'opacity': $("#opacity").slider('value')/100});

    }
});