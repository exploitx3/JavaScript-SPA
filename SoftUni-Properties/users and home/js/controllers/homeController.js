
define('homeController', function () {

    homeController = (function () {
        function HomeController(views) {
            this.viewBag = views;

        }

        HomeController.prototype.welcomeHeaderScreen = function (selector) {
            this.viewBag.welcomeView.loadWelcomeHeaderView(selector);
        };

        HomeController.prototype.homeHeaderScreen = function (selector) {

            this.viewBag.homeView.loadHomeHeaderView(selector);
        };

        HomeController.prototype.welcomeMainScreen = function (selector) {
            this.viewBag.welcomeView.loadWelcomeMainView(selector);
        };

        HomeController.prototype.homeMainScreen = function (selector) {
            var data = {
                username: sessionStorage.getItem('username')
            };

            this.viewBag.homeView.loadHomeMainView(selector, data);
        };

        return {
            load: function (views) {
                return new HomeController(views);
            }
        };
    })();

    return homeController;
});
