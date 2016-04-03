define('utilities', function () {
    function escapeHtml(text) {
        'use strict';
        return text.replace(/[\"&'\/<>]/g, function (a) {
            return {
                '"': '&quot;', '&': '&amp;', "'": '&#39;',
                '/': '&#47;', '<': '&lt;', '>': '&gt;'
            }[a];
        });
    }

    function setUserToStorage(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('fullName', data.fullName);
        sessionStorage.setItem('sessionToken', data._kmd.authtoken);

    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['userId'];
        delete sessionStorage['fullName'];
        delete sessionStorage['sessionToken'];
    }




    return {
        escapeHtml: escapeHtml,
        setUserToStorage: setUserToStorage,
        clearUserFromStorage: clearUserFromStorage
    };
});