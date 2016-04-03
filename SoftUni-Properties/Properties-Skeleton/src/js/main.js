require.config({
    baseUrl: 'js/',
    paths: {
        'noty':'libs/noty/packaged/jquery.noty.packaged',
        'handlebars':'libs/handlebars-v4.0.5',
        'jquery':'libs/jquery-2.2.1',
        'q':'libs/q',
        'sammy':'libs/sammy',
        'ajaxRequester': 'models/ajaxRequester',
        'headers': 'helpers/headers',
        'utilities': 'helpers/utilities',
        'userModel': 'models/userModel',
        'estateModel': 'models/estateModel',
        'homeViews': 'views/homeViews',
        'userViews': 'views/userViews',
        'estateViews': 'views/estateViews',
        'userController': 'controllers/userController',
        'estateController': 'controllers/estateController',
        'homeController': 'controllers/homeController',
        'app': 'app'
    }
});

require(['app'], function (app) {
    app.start();
});