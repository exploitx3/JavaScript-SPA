define('estateViews', ['jquery', 'handlebars'], function ($, Handlebars) {

    var estateViews = (function () {
        function EstateViews() {

        }

        EstateViews.prototype.loadEstatesView = function loadEstatesView(selector, data) {
            return $.get('templates/estate-list.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate({results:data});
                $(selector).html(outHtml);
            });
        };

        EstateViews.prototype.loadAddEstateView = function loadAddEstateView(selector) {
            return $.get('templates/add-estate-form.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate();
                $(selector).html(outHtml);
            }).done();
        };

        EstateViews.prototype.loadEditEstateView = function loadEditEstateView(selector, data) {
            return $.get('templates/edit-estate-form.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        EstateViews.prototype.loadDeleteEstateView = function loadDeleteEstateView(selector, data) {
            return $.get('templates/delete-estate-form.html', function (template) {
                var compiledTemplate = Handlebars.compile(template);
                var outHtml = compiledTemplate(data);
                $(selector).html(outHtml);
            });
        };

        return {
            load: function () {
                return new EstateViews();
            }
        }
    })();
    return estateViews;
});

