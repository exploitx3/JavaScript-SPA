define('userViews', ['jquery', 'handlebars'], function ($, Handlebars) {

    var userViews = (function () {
        function UserViews() {
            this.loginView = {
                loadLoginView: loadLoginView
            };

            this.registerView = {
                loadRegisterView: loadRegisterView
            };
        }

        function loadLoginView(selector) {
            $.get('templates/login.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            }).then(function () {

            });
        }

        function loadRegisterView(selector) {
            return $.get('templates/register.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            });
        }

        return {
            load: function () {
                return new UserViews();
            }
        }
    })();
    return userViews;
});
