$('#paintBtn').on('click', function () {
    "use strict";
    var classNameToPaint = $('#classToPaint').val();
    var colorToChangeTo = $('#colorpicker').val();
    $('.' + classNameToPaint).css('background', colorToChangeTo);
});