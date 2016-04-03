require.config({
    baseUrl: 'js/',
    paths: {
        'noty':'libs/noty/packaged/jquery.noty.packaged',
        'handlebars':'libs/handlebars-v4.0.5',
        'jquery':'libs/jquery-2.2.1',
        'q':'libs/q',
        'sammy':'libs/sammy',
        'ajaxRequester': 'models/ajaxRequester',
        'headers': 'models/headers',
        'utilities': 'utilities',
        'app': 'app'
    }
});

require(['app'], function (app) {
    app.start();
});