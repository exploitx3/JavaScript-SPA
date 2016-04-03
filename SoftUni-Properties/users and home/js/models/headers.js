define('headers', function () {
    var headers = (function () {
        function Headers(appKey) {
            this.appKey = appKey;
        }

        Headers.prototype.getHeaders = function getHeaders(username, password) {
            var headers = {};
            if (sessionStorage['sessionToken']) {
                headers['Authorization'] = 'Kinvey ' + sessionStorage['sessionToken'];
            } else {
                if (username && password) {
                    headers['Authorization'] = 'Basic ' + btoa(username + ":" + password);
                }
            }

            return headers;
        };

        Headers.prototype.getCustomHeaders = function getCustomHeaders(secretOrMasterKey) {
            var headers = {};
            headers['Authorization'] = 'Basic ' + btoa(this.appKey + ":" + secretOrMasterKey);

            return headers;
        };

        return {
            load: function (appKey) {
                return new Headers(appKey);
            }
        }
    }());

    return headers;
});
