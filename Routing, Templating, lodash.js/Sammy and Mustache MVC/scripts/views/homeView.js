var app = app || {};
app.homeView = (function (){
    function HomeView(selector, data){
        $.get('scripts/templates/home.html', function(homeTemplate){
            var output = Mustache.render(homeTemplate);
            $(selector).html(output);
        })
    }

    return {
        load: function(selector, data){
            return new HomeView(selector, data);
        }
    };
})();