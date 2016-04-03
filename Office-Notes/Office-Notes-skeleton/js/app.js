define('app', function (require, exports, module) {
    return {
        start: function () {
            var appKey = 'kid_byMeBsf2J-';
            var appSecret = '58bc214c129c4fdc8f1f57af71d6b48e';
            var baseUrl = 'https://baas.kinvey.com/';

            var $ = require('jquery');
            var Sammy = require('sammy');

            var headers = require('headers').load(appKey, appSecret);
            var utilities = require('utilities');
            var requester = require('ajaxRequester').load();
            var userModel = require('userModel').load(baseUrl, appKey, requester, headers);
            var noteModel = require('noteModel').load(baseUrl, appKey, requester, headers);

            var homeViews = require('homeViews').load();
            var userViews = require('userViews').load();
            var noteViews = require('noteViews').load();

            var homeController = require('homeController').load(homeViews);
            var userController = require('userController').load(userModel, userViews);
            var noteController = require('noteController').load(noteModel, noteViews);


            var router = Sammy(function () {
                var mainSelector = '#container';

                userController.attachUserHandlers(mainSelector);
                noteController.attachNotesHandlers(mainSelector);

                this.before(function () {
                    if (!utilities.checkUserLoggedIn()) {
                        $('#menu').hide();
                    } else {
                        $('#menu').show();
                    }
                });

                this.before({except: {path: '#\/(login\/|register\/)?'}}, function () {
                    if (!utilities.checkUserLoggedIn()) {
                        this.redirect('#/');
                        return false;
                    }
                });

                this.get('#/', function () {
                    homeController.welcomeMainScreen(mainSelector);
                });

                this.get('#/home/', function () {
                    homeController.homeMainScreen(mainSelector);
                });

                this.get('#/login/', function () {
                    if (!utilities.checkUserLoggedIn()) {
                        userController.loadLoginPage(mainSelector);
                    } else {
                        this.redirect('#/');
                    }
                });

                this.get('#/register/', function () {
                    if (!utilities.checkUserLoggedIn()) {
                        userController.loadRegisterPage(mainSelector);
                    } else {
                        this.redirect('#/');
                    }
                });

                this.get('#/logout/', function () {
                    userController.logout();
                });

                this.get('#/office-notes/', function () {
                    noteController.loadAllDayNotesPage(mainSelector);
                });

                this.get('#/my-notes/', function () {
                    noteController.loadMyNotesPage(mainSelector);
                });

                //this.get('#/deleteNote/', function () {
                //    var data = this.params['splat'];
                //    noteController.loadDeleteNotePage(mainSelector, data);
                //});
                //
                //this.get('#/editNote/(.+)', function () {
                //    var data = this.params['splat'];
                //    noteController.loadEditNotePage(mainSelector, data);
                //});

                this.get('#/add-note/', function () {
                    noteController.loadAddNotePage(mainSelector);
                })

            });

            router.run('#/');

        }
    }
});