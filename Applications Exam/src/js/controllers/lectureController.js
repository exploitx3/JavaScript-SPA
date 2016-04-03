define('lectureController', ['jquery', 'noty', 'credentialUtilities', 'moment', 'fullCalendar', 'bootstrap'], function ($, noty, credentials) {
    var lectureController = (function () {
        function LectureController(model, views) {
            this._model = model;
            this._viewsBag = views;
        }

        LectureController.prototype.loadListLecturesPage = function loadListLecturesPage(selector) {
            var _this = this;
            return this._model.listAllLectures()
                .then(function (data) {

                    _this._viewsBag.loadAllLecturesView(selector, data);
                })
                .done();
        };

        LectureController.prototype.loadMyLecturesPage = function loadMyLecturesPage(selector) {
            var _this = this;
            var myId = credentials.getUserId();
            return this._model.listMyLectures(myId)
                .then(function (data) {

                    _this._viewsBag.loadMyLecturesView(selector, data);
                })
                .done();
        };

        LectureController.prototype.loadAddLecturePage = function loadAddLecturePage(selector) {
            this._viewsBag.loadAddLectureView(selector);
        };

        LectureController.prototype.loadEditLecturePage = function loadEditLecturePage(selector, urlParams) {
            var data = decodeURI(urlParams).split('&');
            var outData = {
                id: data[0].split('id=')[1],
                title: data[1].split('title=')[1],
                start: data[2].split('start=')[1],
                end: data[3].split('end=')[1],
                lecturer: data[4].split('lecturer=')[1]
            };
            return this._viewsBag.loadEditLectureView(selector, outData);
        };

        LectureController.prototype.loadDeleteLecturePage = function loadDeleteLecturePage(selector, urlParams) {
            var data = decodeURI(urlParams).split('&');
            var outData = {
                id: data[0].split('id=')[1],
                title: data[1].split('title=')[1],
                start: data[2].split('start=')[1],
                end: data[3].split('end=')[1],
                lecturer: data[4].split('lecturer=')[1]
            };
            this._viewsBag.loadDeleteLectureView(selector, outData);
        };

        LectureController.prototype.addLecture = function addLecture(title, start, end, lecturer) {
            var title = title;
            var start = start;
            var end = end;
            var lecturer = lecturer;
            return this._model.addLecture(title, start, end, lecturer)
                .then(function (data) {
                    noty({
                        text: 'Lecture Added Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/calendar/my/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Add Lecture: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        LectureController.prototype.editLecture = function editLecture(id, title, start, end, lecturer) {
            var title = title;
            var start = start;
            var end = end;
            var lecturer = lecturer;
            return this._model.editLecture(id, title, start, end, lecturer)
                .then(function (data) {
                    noty({
                        text: 'Lecture Edited Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/calendar/my/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Edit Lecture: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        LectureController.prototype.deleteLecture = function deleteLecture(id) {
            return this._model.deleteLecture(id)
                .then(function (data) {
                    noty({
                        text: 'Lecture Deleted Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/calendar/my/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Delete Lecture: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        LectureController.prototype.attachLecturesHandlers = function attachLecturesHandlers(selector) {
            attachAddLectureHandler(selector, this);
            attachEditLectureHandler(selector, this);
            attachDeleteLectureHandler(selector, this);
        };

        function attachAddLectureHandler(selector, controller) {
            $(selector).on('click', '#add-lecture', function () {
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();
                var startDate = new Date(start);
                var endDate = new Date(end);
                if(startDate >= endDate){
                    noty({
                        text: 'Cannot add a lecture with incorect end date ',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    return false;
                }
                var lecturer = credentials.getUsername();
                return controller.addLecture(title, start, end, lecturer);
            })
        }

        function attachEditLectureHandler(selector, controller) {
            $(selector).on('click', '#edit-lecture-button', function () {
                var id = $(this).attr('data-id');
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();
                var lecturer = credentials.getUsername();
                return controller.editLecture(id, title, start, end, lecturer);
            })
        }

        function attachDeleteLectureHandler(selector, controller) {
            $(selector).on('click', '#delete-lecture-button', function () {
                var id = $(this).attr('data-id');
                return controller.deleteLecture(id);
            })
        }


        return {
            load: function (model, views) {
                return new LectureController(model, views);
            }
        }
    })();

    return lectureController;
});
