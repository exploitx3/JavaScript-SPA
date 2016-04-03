var app = app || {};

app.requester = (function () {
    function Requester(baseUrl) {
        this._baseUrl = baseUrl;
    }

    Requester.prototype.get = function get(serviceUrl, success, error) {
        var headers = getHeaders();
        var promise =  makeRequest(this._baseUrl, 'GET', headers, serviceUrl, success, error);
        return promise;
    };

    function makeRequest(baseUrl, method, headers, serviceUrl, data) {
        var defer = Q.defer();
        $.ajax({
            method: method,
            headers: headers,
            url: baseUrl + serviceUrl,
            data: JSON.stringify(data),
            success: function (data) {
                defer.resolve(data);
            },
            error: function (error) {
                defer.reject(error);
            }
        });

        return defer.promise;
    }

    function getHeaders() {
        var headers = {
            'Authorization': 'Basic ZXhwcDpleHA='
        };
        if (sessionStorage.hasOwnProperty('logged-in')) {
            headers = {
                'Authorization': 'Kinvey ' + sessionStorage['logged-in']
            };
        }
        return headers;
    }

    return {
        load: function (baseUrl) {
            return new Requester(baseUrl);
        }
    }
})();