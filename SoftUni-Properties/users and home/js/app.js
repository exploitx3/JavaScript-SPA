define('app', function (require, exports, module) {
    return {
        start: function () {
            var appKey = 'kid_WJh3JjZjkZ';
            var baseUrl = 'https://baas.kinvey.com/';

            var $ = require('jquery');
            var Sammy = require('sammy');

            var headers = require('headers').load(appKey);
            var requester = require('ajaxRequester').load();
            var userModel = require('userModel').load(baseUrl, appKey, requester, headers);
            var homeViews = require('homeViews').load();
            var userViews = require('userViews').load();

            var homeController = require('homeController').load(homeViews);
            var userController = require('userController').load(userViews);


        }
    }
});