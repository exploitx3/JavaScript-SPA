define('noteViews', ['jquery', 'handlebars'], function ($, Handlebars) {

    var noteViews = (function () {
        function NoteViews() {

        }

        NoteViews.prototype.loadNotesView = function loadNotesView(selector, data) {
            return $.get('templates/officeNoteTemplate.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate({results:data});
                $(selector).html(outHtml);
            });
        };

        NoteViews.prototype.loadMyNotesView = function loadMyNotesView(selector, data) {
            return $.get('templates/myNoteTemplate.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate({results:data});
                $(selector).html(outHtml);
            });
        };

        NoteViews.prototype.loadAddNoteView = function loadAddNoteView(selector) {
            return $.get('templates/addNote.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            }).done();
        };

        NoteViews.prototype.loadEditNoteView = function loadEditNoteView(selector, data) {
            return $.get('templates/editNote.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        NoteViews.prototype.loadDeleteNoteView = function loadDeleteNoteView(selector, data) {
            return $.get('templates/deleteNote.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        return {
            load: function () {
                return new NoteViews();
            }
        }
    })();
    return noteViews;
});

