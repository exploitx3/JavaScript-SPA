define('lectureViews', ['jquery', 'handlebars', 'moment', 'fullCalendar', 'bootstrap'], function ($, Handlebars) {
    "use strict";

    var lectureViews = (function () {
        function LectureViews() {

        }

        LectureViews.prototype.loadAllLecturesView = function loadLecturesView(selector, data) {
            return $.get('templates/allCalendar.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
                $('#calendar').fullCalendar({
                    theme: false,
                    header: {
                        left: 'prev,next today addEvent',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2016-01-12',
                    selectable: false,
                    editable: false,
                    eventLimit: true,
                    events: data,
                    customButtons: {
                        addEvent: {
                            text: 'Add Lecture',
                            click: function () {
                                window.location.replace('#/calendar/add/')
                            }
                        }
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        $.get('templates/modal.html', function (templ) {
                            var compiledTemplate = Handlebars.compile(templ);
                            var rendered = compiledTemplate(calEvent);
                            $('#modal-body').html(rendered);
                        });
                        $('#events-modal').modal();
                    }
                });
            });
        };

        LectureViews.prototype.loadMyLecturesView = function loadLecturesView(selector, data) {
            return $.get('templates/myCalendar.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
                $('#calendar').fullCalendar({
                    theme: false,
                    header: {
                        left: 'prev,next today addEvent',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: '2016-01-12',
                    selectable: false,
                    editable: false,
                    eventLimit: true,
                    events: data,
                    customButtons: {
                        addEvent: {
                            text: 'Add Lecture',
                            click: function () {
                                window.location.replace('#/calendar/add/')
                            }
                        }
                    },
                    eventClick: function (calEvent, jsEvent, view) {
                        var _calEvent = calEvent;
                        $.get('templates/modal.html', function (templ) {
                            var compiledTemplate = Handlebars.compile(templ);
                            var rendered = compiledTemplate(calEvent);
                            $('#modal-body').html(rendered);
                            $(selector).on('click', '#editLecture', function () {
                                var dataUrl = 'id=' + _calEvent._id + '&title=' + _calEvent.title + '&start=' + _calEvent.start._i + '&end=' + _calEvent.end._i + '&lecturer=' + _calEvent.lecturer;
                                var encodedDataUrl = encodeURI(dataUrl);

                                window.location.replace('#/calendar/edit-lecture/' + dataUrl);
                            });
                            $(selector).on('click', '#deleteLecture', function () {
                                var dataUrl = 'id=' + _calEvent._id + '&title=' + _calEvent.title + '&start=' + _calEvent.start._i + '&end=' + _calEvent.end._i + '&lecturer=' + _calEvent.lecturer;
                                var encodedDataUrl = encodeURI(dataUrl);
                                window.location.replace('#/calendar/delete-lecture/' + dataUrl);
                            });
                        });
                        $('#events-modal').modal();
                    }
                });
            });
        };

        LectureViews.prototype.loadAddLectureView = function loadAddLectureView(selector) {
            return $.get('templates/add-lecture.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            }).done();
        };

        LectureViews.prototype.loadEditLectureView = function loadEditLectureView(selector, data) {
            return $.get('templates/edit-lecture.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        LectureViews.prototype.loadDeleteLectureView = function loadDeleteLectureView(selector, data) {
            return $.get('templates/delete-lecture.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        return {
            load: function () {
                return new LectureViews();
            }
        }
    })();
    return lectureViews;
});

