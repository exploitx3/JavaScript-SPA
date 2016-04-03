var app = app || {};

app.controller = (function () {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function showHomePage(selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getLoginPage = function getLoginPage(selector) {
       app.loginView.load(selector);
    };

    Controller.prototype.getRegisterPage =
        function getRegisterPage(selector) {
            app.registerView.load(selector);
        };

        Controller.prototype.getStudentsPage = function getStudentsPage(selector){
            this.model.getStudents()
                .then(function (data){
                    app.studentsView.load(selector, data);
                }, function (error) {
                    console.log(error);
                });
        };

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
})();