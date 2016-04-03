var app = app || {};
app.ajaxRequester = (function () {
    function AjaxRequester() {

    }


    AjaxRequester.prototype.makeGetRequest = function makeGetRequest(url, headers) {
        return makeRequest('GET', url, headers);
    };

    AjaxRequester.prototype.makePostRequest = function makePostRequest(url, headers, data) {
        return makeRequest('POST', url, headers, data);
    };

    AjaxRequester.prototype.makePutRequest = function makePutRequest(url, headers, data) {
        return makeRequest('PUT', url, headers, data);
    };

    AjaxRequester.prototype.makeDeleteRequest = function makeDeleteRequest(url, headers) {
        return makeRequest('DELETE', url, headers);
    };


    function makeRequest(method, url, headers, data) {
        var headers = headers || {};
        if (!headers.hasOwnProperty('Authorization')) {
            headers.Authorization = 'Basic 1e4985f54f914ac7ad4bb831b8cea8d8';
        }
        var defer = Q.defer();
        if (data) {
            $.ajax(url, {
                url: url,
                method: method,
                headers: headers,
                data: JSON.stringify(data),
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            });
        } else {
            $.ajax(url, {
                url: url,
                method: method,
                headers: headers,
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            });
        }


        return defer.promise;
    }

    return {
        get: function () {
            return new AjaxRequester();
        }
    };
})();
