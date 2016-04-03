define('noteModel', function () {
    var noteModel = (function () {
        function NoteModel(baseUrl, apiKey, requester, headers) {
            this.serviceUrl = baseUrl + 'appdata/' + apiKey + '/Notes/';
            this.requester = requester;
            this.headers = headers;
        }

        NoteModel.prototype.listAllNotes = function listAllNotes() {
            return this.requester.get(this.serviceUrl, this.headers.getHeaders(false, true));
        };

        NoteModel.prototype.listAllMyNotes = function listAllMyNotes() {
            var filterUrl = '';
            var data = this.requester.get(this.serviceUrl + filterUrl, this.headers.getHeaders(false, true));
            return data;
        };

        NoteModel.prototype.addNote = function addNote(title, text, author, deadline) {
            var data = {
                title: title,
                text: text,
                author: author,
                deadline: deadline
            };

            var headers = this.headers.getHeaders(true, true);
            return this.requester.post(this.serviceUrl, headers, data);
        };

        NoteModel.prototype.deleteNote = function deleteNote(estateId) {

            return this.requester.remove(this.serviceUrl + estateId, this.headers.getHeaders(false, true));
        };

        NoteModel.prototype.editNote = function editNote(noteId, title, text, author, deadline) {
            var data = {
                title: title,
                text: text,
                author: author,
                deadline: deadline
            };
            var headers = this.headers.getHeaders(true, true);

            return this.requester.put(this.serviceUrl + noteId, headers, data);

        };

        return {
            load: function (baseUrl, apiKey, requester, headers) {
                return new NoteModel(baseUrl, apiKey, requester, headers);
            }
        }
    })();

    return noteModel;
});