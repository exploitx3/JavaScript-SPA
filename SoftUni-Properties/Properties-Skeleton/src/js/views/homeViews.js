define('homeViews', ['jquery', 'handlebars'], function ($, Handlebars) {
    var homeViews = (function () {
        function HomeViews() {
            this.welcomeView = {
                loadWelcomeHeaderView: loadWelcomeHeaderView,
                loadWelcomeMainView: loadWelcomeMainView
            };
            this.homeView = {
                loadHomeHeaderView: loadHomeHeaderView,
                loadHomeMainView: loadHomeMainView
            };
        }

        function loadWelcomeHeaderView(selector) {
            $.get('templates/menu.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            })
        }

        function loadHomeHeaderView(selector) {
            $.get('templates/user-menu.html', function (template) {
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

