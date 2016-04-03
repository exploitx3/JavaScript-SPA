define(['q', 'jquery'], function (Q) {
        var USERNAME = 'Exp';
        var PASSWORD = 'Expp';
        function Requester(method, url, headersObj) {
            this.method = method;
            this.url = url;
            this.headersObj = generateHeaders(headersObj);
        }

        Requester.prototype.send = function send(data) {
            var defer = Q.defer();
            $.ajax(this.url, {
                method: this.method,
                headers: this.headersObj,
                data: data,
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            });

            return defer.promise;
        };

        function generateHeaders(headersObj) {
            if (sessionStorage['Authorization-Header']) {
                headersObj['Authorization'] = 'Kinvey ' + sessionStorage['Authorization-Header'];
            } else {
                headersObj['Authorization'] = 'Basic ' + btoa(USERNAME + ":" + PASSWORD);
            }

            return headersObj;
        }

    return Requester;
});