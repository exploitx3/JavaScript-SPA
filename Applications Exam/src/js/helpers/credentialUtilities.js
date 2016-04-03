define('credentialUtilities', [], function () {
    'use strict';
    function getSessionToken() {
        return sessionStorage.getItem('sessionToken');
    }

    function setSessionToken(sessionToken) {
        sessionStorage.setItem('sessionToken', sessionToken);
    }

    function getUserId() {
        return sessionStorage.getItem('userId');
    }

    function setUserId(userId) {
        sessionStorage.setItem('userId', userId);
    }

    function getUsername() {
        return sessionStorage.getItem('username');
    }

    function setUsername(username) {
        sessionStorage.setItem('username', username);
    }


    function clearStorage() {
        sessionStorage.removeItem('sessionToken');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
    }

    function setStorage(sessionToken, userId, username) {
        setSessionToken(sessionToken);
        setUserId(userId);
        setUsername(username);
    }

    function checkUserLoggedIn() {
        var loggedIn = getSessionToken() && getUserId() && getUsername();
        return loggedIn;
    }

    return {
        getSessionToken: getSessionToken,
        getUserId: getUserId,
        getUsername: getUsername,
        setSessionToken: setSessionToken,
        setUserId: setUserId,
        setUsername: setUsername,
        setStorage: setStorage,
        clearStorage: clearStorage,
        checkUserLoggedIn: checkUserLoggedIn
    }
});