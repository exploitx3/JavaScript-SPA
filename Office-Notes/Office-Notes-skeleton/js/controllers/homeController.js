
define('homeController', function () {

    homeController = (function () {
        function HomeController(views) {
            this.viewBag = views;

        }

        HomeController.prototype.welcomeMainScreen = function (selector) {
            this.viewBag.loadWelcomeMainView(selector);
        };

        HomeController.prototype.homeMainScreen = function (selector) {
            var data = {
                username: (sessionStorage.getItem('username')),
                fullName: (sessionStorage.getItem('userFullName'))
            };

            this.viewBag.loadHomeMainView(selector, data);
        };

        return {
            load: function (views) {
                return new HomeController(views);
            }
        };
    })();

    return homeController;
});
