define('homeViews', ['jquery', 'handlebars'], function ($, Handlebars) {
    var homeViews = (function () {
        function HomeViews() {

        }


        HomeViews.prototype.loadWelcomeMainView = function loadWelcomeMainView(selector) {
            $.get('templates/welcome.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            })
        };

        HomeViews.prototype.loadHomeMainView = function loadHomeMainView(selector, data) {
            $.get('templates/home.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            })
        };

        return {
            load: function () {
                return new HomeViews();
            }
        }
    })();
    return homeViews;
});

