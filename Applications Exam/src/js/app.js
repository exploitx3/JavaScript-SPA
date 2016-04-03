define('app', function (require, exports, module) {
    return {
        start: function () {
            var appKey = 'kid_-1Y_KONT1-';
            var appSecret = '6bed69be747841d59e5c804820c39d7f';
            var baseUrl = 'https://baas.kinvey.com/';


            var $ = require('jquery');
            var Sammy = require('sammy');

            var headers = require('headersCreator').load(appKey, appSecret);
            var credentials = require('credentialUtilities');
            var requester = require('ajaxRequester').load();
            var userModel = require('userModel').load(baseUrl, appKey, requester, headers);
            var lectureModel = require('lectureModel').load(baseUrl, appKey, requester, headers);

            var homeViews = require('homeViews').load();
            var userViews = require('userViews').load();
            var lectureViews = require('lectureViews').load();

            var homeController = require('homeController').load(homeViews);
            var userController = require('userController').load(userModel, userViews);
            var lectureController = require('lectureController').load(lectureModel, lectureViews);


            var router = Sammy(function () {
                var menuSelector = '#menu';
                var mainSelector = '#container';

                userController.attachUserHandlers(mainSelector);
                lectureController.attachLecturesHandlers(mainSelector);


                this.get('#/', function () {
                    if (!credentials.checkUserLoggedIn()) {
                        homeController.welcomeMenuScreen(menuSelector);
                        homeController.welcomeMainScreen(mainSelector);

                    } else {
                        homeController.homeMenuScreen(menuSelector);
                        homeController.homeMainScreen(mainSelector);
                    }

                });


                this.get('#/login/', function () {
                    if (!credentials.checkUserLoggedIn()) {
                        userController.loadLoginPage(mainSelector);
                    } else {
                        this.redirect('#/');
                    }
                });

                this.get('#/register/', function () {
                    if (!credentials.checkUserLoggedIn()) {
                        userController.loadRegisterPage(mainSelector);
                    } else {
                        this.redirect('#/');
                    }
                });

                this.get('#/logout/', function () {
                    userController.logout();
                });

                this.get('#/calendar/list/', function () {
                    if (credentials.checkUserLoggedIn()) {
                        lectureController.loadListLecturesPage(mainSelector);
                    } else {
                        this.redirect('#/')
                    }
                });

                this.get('#/calendar/my/', function () {
                    if (credentials.checkUserLoggedIn()) {
                        lectureController.loadMyLecturesPage(mainSelector);
                    } else {
                        this.redirect('#/')
                    }
                });

                this.get('#/calendar/add/', function () {
                    if (credentials.checkUserLoggedIn()) {
                        lectureController.loadAddLecturePage(mainSelector);
                    } else {
                        this.redirect('#/')
                    }
                });

                this.get('#/calendar/edit-lecture/(.*)', function () {
                    if (credentials.checkUserLoggedIn()) {
                        lectureController.loadEditLecturePage(mainSelector, this.params['splat'][0]);
                    } else {
                        this.redirect('#/')
                    }
                });

                this.get('#/calendar/delete-lecture/(.*)', function () {
                    if (credentials.checkUserLoggedIn()) {
                        lectureController.loadDeleteLecturePage(mainSelector, this.params['splat'][0]);
                    } else {
                        this.redirect('#/')
                    }
                })
            });

            router.run('#/');

        }
    }
});