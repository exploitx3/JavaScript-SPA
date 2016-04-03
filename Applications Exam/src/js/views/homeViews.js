define('homeViews', ['jquery', 'handlebars'], function ($, Handlebars) {
    var homeViews = (function () {
        function HomeViews() {
            this.welcomeView = {
                loadWelcomeMenuView: loadWelcomeMenuView,
                loadWelcomeMainView: loadWelcomeMainView
            };
            this.homeView = {
                loadHomeMenuView: loadHomeMenuView,
                loadHomeMainView: loadHomeMainView
            };
        }

        function loadWelcomeMenuView(selector) {
            $.get('templates/menu-login.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            })
        }

        function loadHomeMenuView(selector) {
            $.get('templates/menu-home.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            })
        }

        function loadWelcomeMainView(selector) {
            $.get('templates/welcome-guest.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            })
        }

        function loadHomeMainView(selector, data) {
            $.get('templates/welcome-user.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            })
        }

        return {
            load: function () {
                return new HomeViews();
            }
        }
    })();
    return homeViews;
});

