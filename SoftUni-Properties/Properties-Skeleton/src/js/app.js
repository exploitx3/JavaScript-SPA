define('app', function (require, exports, module) {
    return {
        start: function () {
            var appKey = 'kid_WJh3JjZjkZ';
            var appSecret = '90440a9526744e0c8285850f85cdce3c';
            var baseUrl = 'https://baas.kinvey.com/';

            var $ = require('jquery');
            var Sammy = require('sammy');

            var headers = require('headers').load(appKey, appSecret);
            var utilities = require('utilities');
            var requester = require('ajaxRequester').load();
            var userModel = require('userModel').load(baseUrl, appKey, requester, headers);
            var estateModel = require('estateModel').load(baseUrl, appKey, requester, headers);

            var homeViews = require('homeViews').load();
            var userViews = require('userViews').load();
            var estateViews = require('estateViews').load();

            var homeController = require('homeController').load(homeViews);
            var userController = require('userController').load(userModel, userViews);
            var estateController = require('estateController').load(estateModel, estateViews);

            userController.attachUserHandlers();
            estateController.attachEstatesHandlers();

            var router = Sammy(function () {
                var headerSelector = '#menu';
                var mainSelector = '#main';

                this.before({except:{path:'#\/(login\/|register\/)?'}},function () {
                    if (!utilities.checkUserLoggedIn()) {
                        this.redirect('#/');
                        return false;
                    }
                });

                this.get('#/', function () {
                    homeController.welcomeHeaderScreen(headerSelector);
                    homeController.welcomeMainScreen(mainSelector);
                });

                this.get('#/home/', function () {
                    homeController.homeHeaderScreen(headerSelector);
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

                this.get('#/estates/', function () {
                    estateController.loadListEstatesPage(mainSelector);
                });

                this.get('#/delete-estate/(.+)', function () {
                    var data = this.params['splat'];
                    estateController.loadDeleteEstatePage(mainSelector, data);
                });

                this.get('#/edit-estate/(.+)', function () {
                    var data = this.params['splat'];
                    estateController.loadEditEstatePage(mainSelector, data);
                });

                this.get('#/add-estate/', function () {
                    estateController.loadAddEstatePage(mainSelector);
                })

            });

            router.run('#/');

        }
    }
});