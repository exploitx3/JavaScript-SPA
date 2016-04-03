define('headersCreator', function () {
    var headersCreator = (function () {
        function HeadersCreator(appKey, appSecret) {
            this.appKey = appKey;
            this.appSecret = appSecret;
        }

        HeadersCreator.prototype.getHeaders = function getHeaders(isJSON, userSession) {
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
                return new HeadersCreator(appKey, appSecret);
            }
        }
    }());

    return headersCreator;
});
