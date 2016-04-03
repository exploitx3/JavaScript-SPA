define('headers', function () {
    var headers = (function () {
        function Headers(appKey, appSecret) {
            this.appKey = appKey;
            this.appSecret = appSecret;
        }

        Headers.prototype.getHeaders = function getHeaders(isJSON, userSession) {
            var headers = {};
            if (isJSON) {
                headers['Content-Type'] = 'application/json';
            }
            if (userSession) {
                headers['Authorization'] = 'Kinvey ' + sessionStorage['sessionToken'];
            } else {
                headers['Authorization'] = 'Basic ' + btoa(this.appKey + ":" + this.appSecret);
            }

            return headers;
        };


        return {
            load: function (appKey, appSecret) {
                return new Headers(appKey, appSecret);
            }
        }
    }());

    return headers;
});
