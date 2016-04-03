var app = app || {};

app.registerView = (function (){
    function RegisterView(selector, data){
        $.get('scripts/templates/register.html', function(registerTemplate){
            var output = Mustache.render(registerTemplate);
            $(selector).html(output);
        });
    }


    return {
        load: function(selector, data){
            return new RegisterView(selector, data);
        }
    }
})();