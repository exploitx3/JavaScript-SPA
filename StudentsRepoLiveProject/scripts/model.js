var app = app || {};

app.models = (function () {
    function Models(baseUrl) {
        this.baseUrl = baseUrl;
        this.students = new Students(this.baseUrl);
    }

    var Requester = (function () {
        //var BASE_APP_URL = 'https://baas.kinvey.com/appdata/kid_-JgNwJIdJ-/';
        //var BASE_USER_URL = 'https://baas.kinvey.com/user/kid_-JgNwJIdJ-/';
        var AUTHORIZATION_HEADER = 'Basic dXNlcjp1c2Vy';

        function makeRequest(method, url, data, success, error) {
            var headers = {
                'Authorization': AUTHORIZATION_HEADER,
            };
            if(method === 'POST'){
                headers['Content-Type'] = 'application/json';
            }
            $.ajax({
                method: method,
                headers: headers,
                url: url,
                data: JSON.stringify(data),
                success: success,
                error: error
            })
        }

        function getRequest(url, success, error) {
            makeRequest('GET', url, null, success, error);
        }

        function postRequest(url, data, success, error) {
            makeRequest('POST', url, data, success, error);
        }

        function deleteRequest(url, success, error) {
            makeRequest('DELETE', url, null, success, error);
        }


        return {
            getRequest: getRequest,
            postRequest: postRequest,
            deleteRequest: deleteRequest
        }
    })();

    var Students = (function () {
        function Students(baseUrl) {
            this.serviceUrl = baseUrl + 'Students/';
        }

        Students.prototype.getAllStudents = function getAllStudents(success, error) {
            return Requester.getRequest(this.serviceUrl, success, error);
        };

        Students.prototype.postStudent = function postStudent(student, success, error) {
            return Requester.postRequest(this.serviceUrl, student, success, error);
        };

        Students.prototype.removeStudent = function removeStudent(id, success, error) {
            return Requester.deleteRequest(this.serviceUrl + id, success, error);
        };

        return Students;
    })();


    return {
        loadModels: function (baseUrl) {
            return new Models(baseUrl);
        }
    };
})();

//app.models.students.getAll();
//app.models.students.post(student);
//app.models.students.delete(studentID);