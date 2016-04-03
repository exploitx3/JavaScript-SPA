define(['requester', 'jquery', 'q', 'book', 'handlebars'], function (Requester, $, Q, Book, Handlebars) {
    function Controller(baseUrl) {
        this.books = [];
        this.baseUrl = baseUrl;
    }

    Controller.prototype.getHomeRoute = function (_router) {
        var requester = new Requester('GET', this.baseUrl + 'Books/', {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
        });
        _this = this;
        requester.send()
            .then(function (data) {
                return fillBooksArray(data, _this.books);
            })
            .then(function (books) {
                return viewSelectTemplate(_this.books);
            })
            .then(function () {
                return viewButtonTemplate(_this.books);
            })
            .then(function () {
                return viewBookInfoTemplate(_router, _this.books);
            }, function (error) {
                console.log(error);
            }).done();
    };

    Controller.prototype.getAddBook = function (_router) {
        var bookTitle = $('#book-title').val();
        var bookAuthor = $('#book-author').val();
        var bookISBN = $('#book-ISBN').val();
        var requester = new Requester('POST', this.baseUrl + 'Books/', {
            'Content-Type': 'application/json'
            //'Accepts': 'application/json'
        });
        var book = {
            title: bookTitle,
            author: bookAuthor,
            isbn: bookISBN,
            tags: []
        };
        requester.send(JSON.stringify(book));
        _router.redirect('#/');
    };

    Controller.prototype.getDeleteBook = function (_router) {
        var bookIndex = getSelectedBookIndex();
        var bookID = this.books[bookIndex]._id;

        var requester = new Requester('DELETE', this.baseUrl + 'Books/' + bookID, {});
        requester.send()
            .then(function () {
                _router.redirect('#/');
            });
    };

    Controller.prototype.getEditBook = function (_router) {
        var bookTitleElem = $('#booksSelectElement option:selected');
        var bookIndex = bookTitleElem.index();
        var bookToEditID = this.books[bookIndex]._id;

        var edittedBookTitle = $('#editBookTitle').val();
        var edittedBookAuthor = $('#editBookAuthor').val();
        var edittedBookISBN = $('#editBookISBN').val();


        var requester = new Requester('PUT', this.baseUrl + 'Books/' + bookToEditID, {
            'Content-Type': 'application/json'
        });
        var book = {
            title: edittedBookTitle,
            author: edittedBookAuthor,
            isbn: edittedBookISBN,
            tags: this.books[bookIndex].tags
        };
        requester.send(JSON.stringify(book))
            .then(function () {
                _router.redirect('#/');
            });
    };

    function viewSelectTemplate(books) {
        var defer = Q.defer();
        $.get('templates/booksSelectTemplate.html', function (data) {
                var defer = Q.defer();
                var template = Handlebars.compile(data);
                var htmlToAppend = template({books: books});
                $('#wrapper').html(htmlToAppend);

                return defer.promise;
            })
            .then(function () {
                defer.resolve();
            });
        return defer.promise;
    }

    function viewButtonTemplate(books) {
        var defer = Q.defer();
        $.get('templates/booksButtonsTemplate.html', function (data) {
            var bookTitle = $('#booksSelectElement option:selected').text();
            var book = books.find(function (book) {
                return book.title === bookTitle;
            });
            var defer = Q.defer();
            var template = Handlebars.compile(data);
            var htmlToAppend = template({book: book});
            $('#options').html(htmlToAppend);
            defer.resolve();
            return defer.promise;
        }).then(function () {
            defer.resolve();
        });
        return defer.promise;
    }

    function viewBookInfoTemplate(_route, books) {
        var defer = Q.defer();
        $.get('templates/booksInfoTemplate.html', function (data) {
            var innerDefer = Q.defer();
            var bookIndex = getSelectedBookIndex();
            var template = Handlebars.compile(data);
            var htmlToAppend = template(books[bookIndex]);
            $('#content').html(htmlToAppend);
            $('#booksSelectElement').on('change', function () {
                viewButtonTemplate(books);
                viewBookInfoTemplate(_route, books);
            });
            innerDefer.resolve();
            return innerDefer.promise;
        }).then(function () {
            var addTagElement = $('#addTagButton');
            var editTagElement = $('.editTagButton');
            var deleteTagElement = $('.deleteTagButton');
            addTagElement.on('click', function () {
                addTagFunction(_route, this, books);
            });
            editTagElement.on('click', function () {
                editTagFunction(_route, this, books);
            });
            deleteTagElement.on('click', function () {
                deleteTagFunction(_route, this, books);
            });
            defer.resolve();
        });
        return defer;
    }

    function editTagFunction(_route, _this, books) {
        var currentBookIndex = getSelectedBookIndex();
        var tagToEdit = $(_this.previousElementSibling.previousElementSibling.previousElementSibling).text();
        var tagToEditIndex = books[currentBookIndex].tags.indexOf(tagToEdit);
        var newTag = _this.previousElementSibling.value;
        books[currentBookIndex].tags[tagToEditIndex] = newTag;
        _route.redirect('#/EditBook');
    }

    function addTagFunction(_route, _this, books) {
        var currentBookIndex = getSelectedBookIndex();
        var newTag = _this.previousElementSibling.value;
        books[currentBookIndex].tags.push(newTag);
        _route.redirect('#/EditBook');
    }

    function deleteTagFunction(_route, _this, books) {
        var currentBookIndex = getSelectedBookIndex();
        var tagToDelete = $(_this.previousElementSibling).text();
        var tagToDeleteIndex = books[currentBookIndex].tags.indexOf(tagToDelete);
        books[currentBookIndex].tags.splice(tagToDeleteIndex, 1);
        _route.redirect('#/EditBook');
    }

    function fillBooksArray(data, books) {
        var defer = Q.defer();
        books.length = 0;
        data.forEach(function (elem) {
            var newBook = new Book(elem.title, elem.author, elem.isbn, elem.tags, elem._id);
            books.push(newBook);
        });
        defer.resolve(books);
        return defer.promise;
    }

    function getSelectedBookIndex() {
        var bookTitleElem = $('#booksSelectElement option:selected');
        var bookIndex = bookTitleElem.index();
        return bookIndex;
    }

    return Controller;
});