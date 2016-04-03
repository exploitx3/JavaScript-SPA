define('utilities', function () {
    //function escapeHtml(text) {
    //    'use strict';
    //    return text.replace(/[\"&'\/<>]/g, function (a) {
    //        return {
    //            '"': '&quot;', '&': '&amp;', "'": '&#39;',
    //            '/': '&#47;', '<': '&lt;', '>': '&gt;'
    //        }[a];
    //    });
    //}
    //
    //function decodeHtml(text) {
    //    'use strict';
    //    return text.replace(/&quot;|&amp;|&#39;|&#47;|&lt;|&gt;/g, function (a) {
    //        return {
    //            '&quot;': '"', '&amp;': '&', "&#39;": "'",
    //            '&#47;': '/', '&lt;': '<', '&gt;': '>'
    //        }[a];
    //    });
    //}

    function setUserToStorage(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('sessionToken', data._kmd.authtoken);

    }

    function checkUserLoggedIn() {
        var userLoggedIn = sessionStorage['username'] && sessionStorage['userId'] && sessionStorage['sessionToken'];
        return userLoggedIn;
    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['sessionToken'];
    }


    return {
        //escapeHtml: escapeHtml,
        //decodeHtml: decodeHtml,
        setUserToStorage: setUserToStorage,
        clearUserFromStorage: clearUserFromStorage,
        checkUserLoggedIn: checkUserLoggedIn
    };
});