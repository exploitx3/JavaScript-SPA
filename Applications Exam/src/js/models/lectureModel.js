define('lectureModel', function () {
    var lectureModel = (function () {
        function LectureModel(baseUrl, apiKey, requester, headers) {
            this.serviceUrl = baseUrl + 'appdata/' + apiKey + '/Lectures/';
            this.requester = requester;
            this.headers = headers;
        }

        LectureModel.prototype.listAllLectures = function listAllLectures() {
            
            return this.requester.get(this.serviceUrl, this.headers.getHeaders(false, true));
        };

        LectureModel.prototype.listMyLectures = function listMyLectures(userId) {
            var filterUrl = '?query={"_acl":{"creator":"' + userId + '"}}';

            var data = this.requester.get(this.serviceUrl + filterUrl, this.headers.getHeaders(false, true));
            return data;
        };

        LectureModel.prototype.addLecture = function addLecture(title, start, end, lecturer) {
            var data = {
                title: title,
                start: start,
                end: end,
                lecturer: lecturer
            };

            var headers = this.headers.getHeaders(true, true);
            return this.requester.post(this.serviceUrl, headers, data);
        };

        LectureModel.prototype.deleteLecture = function deleteLecture(lectureId) {

            return this.requester.remove(this.serviceUrl + lectureId, this.headers.getHeaders(false, true));
        };

        LectureModel.prototype.editLecture = function editLecture(lectureId, title, start, end, lecturer) {
            var data = {
                title: title,
                start: start,
                end: end,
                lecturer: lecturer
            };
            var headers = this.headers.getHeaders(true, true);

            return this.requester.put(this.serviceUrl + lectureId, headers, data);

        };

        return {
            load: function (baseUrl, apiKey, requester, headersCreator) {
                return new LectureModel(baseUrl, apiKey, requester, headersCreator);
            }
        }
    })();

    return lectureModel;
});