var app = app || {};
app.loginView = (function (){
    function LoginView(selector, data){
        $.get('scripts/templates/login.html', function(loginTemplate){
            var output = Mustache.render(loginTemplate);
            $(selector).html(output);
        });
    }

    return {
        load: function(selector, data){
            return new LoginView(selector, data);
        }
    };
})();