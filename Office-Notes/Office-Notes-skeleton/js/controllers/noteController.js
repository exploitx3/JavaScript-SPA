define('noteController', ['jquery', 'noty'], function ($, noty) {

    var NoteController = (function () {
        function NoteController(model, views) {
            this.model = model;
            this.viewsBag = views;
        }

        NoteController.prototype.loadAllDayNotesPage = function loadAllDayNotesPage(selector) {
            var _this = this;
            return this.model.listAllNotes()
                .then(function (data) {
                    var deadline = new Date().toISOString().substring(0, 10);
                    var modifiedData = data.filter(function (item) {
                        if (item.deadline === deadline) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    _this.viewsBag.loadNotesView(selector, modifiedData);
                })
                .done();
        };

        NoteController.prototype.loadMyNotesPage = function loadMyNotesPage(selector) {
            var _this = this;
            return this.model.listAllNotes()
                .then(function (data) {
                    var username = sessionStorage.getItem('username');
                    var modifiedData = data.filter(function (item) {
                        if (item.author === username) {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    _this.viewsBag.loadMyNotesView(selector, modifiedData);
                })
                .done();
        };

        NoteController.prototype.loadAddNotePage = function loadAddNotePage(selector) {
            this.viewsBag.loadAddNoteView(selector);
        };

        //NoteController.prototype.loadEditNotePage = function loadEditNotePage(selector, urlParams) {
        //    var data = decodeURI(urlParams).split('&');
        //    var outData = {
        //        _id: data[0].split('id=')[1],
        //        name: data[1].split('name=')[1],
        //        category: data[2].split('category=')[1],
        //        price: data[3].split('price=')[1]
        //    };
        //    return this.viewsBag.loadEditNoteView(selector, outData);
        //};

        //NoteController.prototype.loadDeleteNotePage = function loadDeleteNotePage(selector, urlParams) {
        //    var data = decodeURI(urlParams).split('&');
        //    var outData = {
        //        _id: data[0].split('id=')[1],
        //        name: data[1].split('name=')[1],
        //        category: data[2].split('category=')[1],
        //        price: data[3].split('price=')[1]
        //    };
        //    this.viewsBag.loadDeleteNoteView(selector, outData);
        //};

        NoteController.prototype.addNote = function addNote(title, text, author, deadline) {
            var title = title;
            var text = text;
            var author = author;
            var deadline = deadline;
            return this.model.addNote(title, text, author, deadline)
                .then(function (data) {
                    noty({
                        text: 'Note Added Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/notes/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Add Note: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        NoteController.prototype.editNote = function editNote(noteId, title, text, author, deadline) {
            var title = title;
            var text = text;
            var author = author;
            var deadline = deadline;
            return this.model.editNote(noteId, title, text, author, deadline)
                .then(function (data) {
                    noty({
                        text: 'Note Edited Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/notes/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Edit Note: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        NoteController.prototype.deleteNote = function deleteNote(id) {
            return this.model.deleteNote(id)
                .then(function (data) {
                    noty({
                        text: 'Note Deleted Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/notes/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Delete Note: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        NoteController.prototype.attachNotesHandlers = function attachNotesHandlers(selector) {
            attachAddNoteHandler(selector, this);
            attachEditNoteHandler(selector, this);
            attachDeleteNoteHandler(selector, this);
            attachEditNoteHandler(selector, this);
            attachLoadEditNotePageHandler(selector, this);
            attachDeleteNotePageHandler(selector, this);
        };

        function attachAddNoteHandler(selector, controller) {
            $(selector).on('click', '#add-note-button', function () {
                var title = $('#title').val();
                var text = $('#text').val();
                var author = sessionStorage.getItem('username');
                var deadline = ($('#deadline').val());
                return controller.addNote(title, text, author, deadline);
            })
        }

        function attachEditNoteHandler(selector, controller) {
            $(selector).on('click', '#edit-note-button', function () {
                var noteId = $(this).parent().attr('data-id');
                var title = $('#title').val();
                var text = $('#text').val();
                var author = sessionStorage.getItem('username');
                var deadline = ($('#deadline').val());
                return controller.editNote(noteId, title, text, author, deadline)
            })
        }

        function attachLoadEditNotePageHandler(selector, controller) {
            $(selector).on('click', '.edit', function () {
                var noteId = $(this).parent().attr('data-id');
                var title = $(this).prev().children()[0].textContent;
                var text = $(this).prev().children()[1].textContent;
                var author = $(this).prev().children()[2].textContent;
                var deadline = $(this).prev().children()[3].textContent;
                var data = {
                    noteId: noteId,
                    title: title,
                    text: text,
                    author: author,
                    deadline: deadline
                };
                return controller.viewsBag.loadEditNoteView(selector, data);
            })
        }

        function attachDeleteNotePageHandler(selector, controller) {
            $(selector).on('click', '.delete', function () {
                var noteId = $(this).parent().attr('data-id');
                var title = $(this).prev().prev().children()[0].textContent;
                var text = $(this).prev().prev().children()[1].textContent;
                var author = $(this).prev().prev().children()[2].textContent;
                var deadline = $(this).prev().prev().children()[3].textContent;
                var data = {
                    noteId: noteId,
                    title: title,
                    text: text,
                    author: author,
                    deadline: deadline
                };
                return controller.viewsBag.loadDeleteNoteView(selector, data);
            })
        }

        function attachDeleteNoteHandler(selector, controller) {
            $(selector).on('click', '#delete-note-button', function () {
                var noteId = $(this).parent().attr('data-id');
                return controller.deleteNote(noteId);
            })
        }

        return NoteController;
    })();

    return {
        load: function (model, views) {
            return new NoteController(model, views);
        }
    }
});