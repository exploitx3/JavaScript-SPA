
define('homeController', function () {

    homeController = (function () {
        function HomeController(views) {
            this._viewBag = views;

        }

        HomeController.prototype.welcomeMenuScreen = function (selector) {
            this._viewBag.welcomeView.loadWelcomeMenuView(selector);
        };

        HomeController.prototype.homeMenuScreen = function (selector) {

            this._viewBag.homeView.loadHomeMenuView(selector);
        };

        HomeController.prototype.welcomeMainScreen = function (selector) {
            this._viewBag.welcomeView.loadWelcomeMainView(selector);
        };

        HomeController.prototype.homeMainScreen = function (selector) {
            var data = {
                username: (sessionStorage.getItem('username'))
                //username: utilities.decodeHtml(sessionStorage.getItem('username'))
            };

            this._viewBag.homeView.loadHomeMainView(selector, data);
        };

        return {
            load: function (views) {
                return new HomeController(views);
            }
        };
    })();

    return homeController;
});
