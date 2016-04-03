define('userController', ['jquery', 'noty', 'utilities'], function ($, noty, utilities) {
    var userController = (function () {
        function UserController(model, views) {
            this.model = model;
            this.viewBag = views;
        }

        UserController.prototype.loadLoginPage = function loadLoginPage(selector) {
            return this.viewBag.loginView.loadLoginView(selector);
        };

        UserController.prototype.loadRegisterPage = function loadRegisterPage(selector) {
            return this.viewBag.registerView.loadRegisterView(selector);
        };

        UserController.prototype.login = function login(username, password) {
            return this.model.login(username, password)
                .then(function (loginData) {
                 utilities.setUserToStorage(loginData);
                    window.location.replace('#/home/');
                    noty({
                            text: 'Logged-in Successfully',
                            type: 'info',
                            layout: 'topCenter',
                            timeout: 1000
                        }
                    );
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                            text: 'Cannot Login: ' + errMsg,
                            type: 'error',
                            layout: 'topCenter',
                            timeout: 5000
                        }
                    );
                });
        };

        UserController.prototype.register = function register(username, pass, confirmPass) {
            if (pass !== confirmPass) {
                throw Error('Password and Confirm password doesn\'t match');
            }
            return this.model.register(username, pass)
                .then(function (registerData) {
                    utilities.setUserToStorage(registerData);
                    window.location.replace('#/home/');
                    noty({
                            text: 'Registered Successfully',
                            type: 'info',
                            layout: 'topCenter',
                            timeout: 1000
                        }
                    );
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                            text: 'Cannot Register: ' + errMsg,
                            type: 'error',
                            layout: 'topCenter',
                            timeout: 5000
                        }
                    );
                });
        };

        UserController.prototype.logout = function logout() {
            return this.model.logout()
                .then(function () {
                    utilities.clearUserFromStorage();
                    window.location.replace('#/');
                    noty({
                            text: 'Logged out Successfully',
                            type: 'info',
                            layout: 'topCenter',
                            timeout: 1000
                        }
                    );
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                            text: 'Cannot Logout: ' + errMsg,
                            type: 'error',
                            layout: 'topCenter',
                            timeout: 5000
                        }
                    );
                });
        };

        UserController.prototype.attachUserHandlers = function attachUserHandlers(){
            var selector = '#main';
            attachLoginHandler(selector, this);
            attachRegisterHandler(selector, this);
        };
        
        function attachRegisterHandler(selector, controller) {
            $(selector).on('click', '#register-button', function () {
                var username = $('#username').val();
                var password = $('#password').val();
                var confirmPassword = $('#confirm-password').val();


                return controller.register(username, password, confirmPassword);
            });
        }

        function attachLoginHandler(selector, controller) {
            $(selector).on('click', '#login-button', function () {
                    var username = $('#username').val();
                    var password = $('#password').val();

                    return controller.login(username, password);
            });
        }

        return {
            load: function (model, userViews) {
                return new UserController(model, userViews);
            }
        };
    })();
    return userController;
});
