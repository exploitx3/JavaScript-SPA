require.config({
    baseUrl: 'js/',
    paths: {
        'noty':'libs/noty/packaged/jquery.noty.packaged',
        'handlebars':'libs/handlebars-v4.0.5',
        'mustache':'libs/mustache.min',
        'bootstrap':'libs/bootstrap',
        'jquery':'libs/jquery.min',
        'q':'libs/q',
        'fullCalendar':'libs/fullcalendar',
        'moment':'libs/moment.min',
        'sammy':'libs/sammy',
        'ajaxRequester': 'models/ajaxRequester',
        'headersCreator': 'helpers/headersCreator',
        'credentialUtilities': 'helpers/credentialUtilities',
        'userModel': 'models/userModel',
        'lectureModel': 'models/lectureModel',
        'homeViews': 'views/homeViews',
        'userViews': 'views/userViews',
        'lectureViews': 'views/lectureViews',
        'userController': 'controllers/userController',
        'lectureController': 'controllers/lectureController',
        'homeController': 'controllers/homeController',
        'app': 'app'
    }
});

require(['app'], function (app) {
    app.start();
});