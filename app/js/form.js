$(function () {
    var moveX = $("#moveX").spinner(),
        moveY = $("#moveY").spinner(),
        marginLeft = $("#margin-left").spinner(),
        marginBottom = $("#margin-bottom").spinner(),
        opacity = $("#opacity").slider({
            range: "min",
            value: 100,
            orientation: "horizontal"
        });

    $(".placement-select__item").on("click", function () {
        var id = $(this).data('select-placement');

        $(id).addClass('active').siblings('.position-select').removeClass('active');
        $(this).addClass('active').siblings('.placement-select__item').removeClass('active');
    });
    $('input[type=file]').change(function() {
        var input = $(this).data('download-file'),
            filename = $(this).val().split('\\').pop();

        $(input).val( filename ); // Set the value
    });
});