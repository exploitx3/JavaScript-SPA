elemInsertModule = (function($) {
    "use strict";
    function addTo(jQueryElem, parentElem){
        parentElem.append(jQueryElem);
    }
    return {
        addTo: addTo
    }
})(jQuery);
var newElem = $('<li>I\'am added</li>');
elemInsertModule.addTo(newElem, $('ul'));