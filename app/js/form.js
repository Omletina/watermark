"use strict";

$(function () {

    //Включаем UI объекты определяющие положение и прозрачность водянного(ых) знака
    var $draggable_elem,
        moveX = $("#moveX").spinner(),
        moveY = $("#moveY").spinner(),
        marginRight = $("#margin-right").spinner({
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
        var $this = $(this),
            id = $this.data('select-placement');

        $(id).addClass('active').siblings('.position-select').removeClass('active');
        $this.addClass('active').siblings('.placement-select__item').removeClass('active');

        var imgFile = '/img/watermark.jpg'; // todo - это значение надо инизиализировать при загрузке изображения

        if ($this.hasClass('placement-select__item_multi')) {
            watermark.init(imgFile, 'multy');
            $('input[name=mode]').val('multy');

            //Используем сохраненное значение в случае переключения между режимами мульти и сингл
            watermark.setRightMargin(marginRight.val());
            watermark.setBottomMargin(marginBottom.val());
            refreshOpacity();

        } else {
            $draggable_elem = watermark.init(imgFile);

            //Отображаем координаты при их изменении способом Драг энд Дроп
            $draggable_elem.on("drag", function (event, ui) {
                moveX.val(ui.position.left);
                moveY.val(ui.position.top);
            });

            $('input[name=mode]').val('single');

            //Используем сохраненное значение в случае переключения между режимами мульти и сингл
            watermark.setPosition({x: moveX.val(), y: moveY.val()});
            refreshOpacity();

        }

    });

    //Отображаем в кастомном инпуте имя загруженного файла
    $('input[type=file]').change(function () {
        var input = $(this).data('file-name-input'),
            filename = $(this).val().split('\\').pop();

        $(input).val(filename); // Set the value
    });

    //Изменяем положение водяного знака(режим сингл, координата Х)
    moveX.on('spin', function (event, ui) {
        watermark.setPosition({x: ui.value});
    });

    //Изменяем положение водяного знака(режим сингл, координата Y)
    moveY.on('spin', function (event, ui) {
        watermark.setPosition({y: ui.value});
    });


    //Меняем размеры дивов которые визуализируют отступы между водяными знаками в режиме "Замостить"
    marginRight.on("spin", function (event, ui) {

        var marginRightVal = ui.value;

        $('.choose-position__margin_right').css({
            'width': marginRightVal,
            'margin-left': -marginRightVal / 2
        });

        watermark.setRightMargin(marginRightVal);
    });
    marginBottom.on("spin", function (event, ui) {

        var marginBottomVal = ui.value;

        $('.choose-position__margin_bottom').css({
            'height': marginBottomVal,
            'margin-top': -marginBottomVal / 2
        });

        watermark.setBottomMargin(marginBottomVal);
    });

    function refreshOpacity() {
        var opacity = $("#opacity").slider('value') / 100;
        $('.watermark').css({'opacity': opacity});

        $('input[name=opacity]').val(opacity);
    }


    //Режим сингл: позиционирование водяного знака
    $('.choose-position__item').on('click', function () {
        var $this = $(this);
        var posId = $this.attr('id');
        $this.addClass('active').siblings().removeClass('active');


        var coords = {};

        switch (posId) {
            case 'top-left':
            {
                coords.x = 0;
                coords.y = 0;
                break;
            }

            case 'top-center':
            {
                coords.x = getMiddleX();
                coords.y = 0;
                break;
            }

            case 'top-right':
            {
                coords.x = getRightX();
                coords.y = 0;
                break;
            }

            case 'middle-left':
            {
                coords.x = 0;
                coords.y = getMiddleY();
                break;
            }

            case 'middle-center':
            {
                coords.x = getMiddleX();
                coords.y = getMiddleY();
                break;
            }

            case 'middle-right':
            {
                coords.x = getRightX();
                coords.y = getMiddleY();
                break;
            }

            case 'bottom-left':
            {
                coords.x = 0;
                coords.y = getBottomY();
                break;
            }

            case 'bottom-center':
            {
                coords.x = getMiddleX();
                coords.y = getBottomY();
                break;
            }

            case 'bottom-right':
            {
                coords.x = getRightX();
                coords.y = getBottomY();
                break;
            }

            default:
            {
                coords.x = 0;
                coords.y = 0;
            }
        }

        watermark.setPosition(coords);
        // Транслируем значение координат в инпуты
        moveX.val(coords.x);
        moveY.val(coords.y);

    });

    function getMiddleX() {
        var wm_size = watermark.getSize();
        var aimImgW = getAimImgW();
        return Math.round(aimImgW / 2 - wm_size.w / 2);
    }

    function getMiddleY() {
        var wm_size = watermark.getSize();
        var aimImgH = getAimImgH();
        return Math.round(aimImgH / 2 - wm_size.h / 2);
    }

    function getRightX() {
        var wm_size = watermark.getSize();
        var aimImgW = getAimImgW();
        return aimImgW - wm_size.w;
    }

    function getBottomY() {
        var wm_size = watermark.getSize();
        var aimImgH = getAimImgH();
        return aimImgH - wm_size.h;
    }

    function getAimImgW() {
        return $('.aim-img img').width();
    }

    function getAimImgH() {
        return $('.aim-img img').height();
    }

    var IMG_SRC = 'upload/images/files/';
    var MAX_FILE_SIZE = 2000000;
    var $wm = $('.aim-img');


    function UploadImg(id) {

        var $input = $("input[data-download-file= '" + id + "' ]");

        $input.fileupload({
            url: 'upload/images/index.php',
            dataType: 'json',
            add: function (e, data) {
                var errorsText = '';
                var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;

                data.submit();

            },
            done: function (e, data) {

                $.each(data.result.files, function (index, file) {
                    addImg(file.name, id);

                });
            },

            fail: function (e, data) {
            }
        });
    }

    function addImg(fileName, container) {
        var src = IMG_SRC + fileName;
        console.log(src);
        console.log(container)

    }

    function DownloadImg() {
        if (!checkUploadImg()) {
            return;
        }
        var $form = $(this);
        var data = $form.serialize();
        $.ajax({
            url: 'create-img.php',
            type: 'POST',
            dataType: 'html',
            data: data,
            beforeSend: function () {
                $('.preloader').show();
            },
            success: function (response) {
                downloadResImg(getObj(response));
                $('.preloader').hide();
            },
            error: function (response) {
            }
        });
    }


    UploadImg('#image');
    UploadImg('#watermark');


    //Отправка формы

    $('.form').on('submit', function (e) {

        //if(watermark){
        //    var coords = watermark.getCoords();
        //    $('input[name=x]').val(coords.x);
        //    $('input[name=y]').val(coords.y);
        //}

        // для отладки - можно потом удалить
        console.log('x: ' + $('input[name=value_x]').val());
        console.log('y: ' + $('input[name=value_y]').val());
        console.log('right_margin: ' + $('input[name=value_right]').val());
        console.log('bottom_margin: ' + $('input[name=value_bottom]').val());
        console.log('opacity: ' + $('input[name=opacity]').val());
        console.log('mode: ' + $('input[name=mode]').val());

        e.preventDefault(e);
    });
});