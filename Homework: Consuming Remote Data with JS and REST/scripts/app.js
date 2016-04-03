require.config({
    paths: {
        'requester': 'requester',
        'jquery': 'libs/jquery-2.2.1',
        'handlebars': 'libs/handlebars-v4.0.5',
        'sammy': 'libs/sammy',
        'q': 'libs/q',
        'book': 'models/bookModel',
        'controller': 'controllers/controller'
    }
});

require(['jquery', 'requester', 'handlebars', 'q', 'book', 'sammy', 'controller'],
    function ($, Requester, Handlebars, Q, Book, Sammy, Controller) {
        var controller = new Controller('https://baas.kinvey.com/appdata/kid_Wyr3s474Jb/');


        var router = Sammy(function () {
            this.get('#/', function () {
                controller.getHomeRoute(this);
            });

            this.get('#/AddBook', function () {
                controller.getAddBook(this);
            });

            this.get('#/DeleteBook', function () {
                controller.getDeleteBook(this);
            });

            this.get('#/EditBook', function () {
                controller.getEditBook(this);
            });
        });
        router.run('#/');
    });