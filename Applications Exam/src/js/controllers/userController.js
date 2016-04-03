define('userController', ['jquery', 'noty', 'credentialUtilities'], function ($, noty, credentials) {
    var userController = (function () {
        function UserController(model, views) {
            this._model = model;
            this._viewBag = views;
        }

        UserController.prototype.loadLoginPage = function loadLoginPage(selector) {
            return this._viewBag.loginView.loadLoginView(selector);
        };

        UserController.prototype.loadRegisterPage = function loadRegisterPage(selector) {
            return this._viewBag.registerView.loadRegisterView(selector);
        };

        UserController.prototype.login = function login(username, password) {
            return this._model.login(username, password)
                .then(function (loginData) {
                    credentials.setStorage(loginData._kmd.authtoken, loginData._id, loginData.username);
                    window.location.replace('#/');
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
                noty({
                        text: 'Pass and confirm pass doesn\'t match ',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000
                    }
                );
                return false;
            }
            return this._model.register(username, pass)
                .then(function (registerData) {
                    credentials.setStorage(registerData._kmd.authtoken, registerData._id, registerData.username);
                    noty({
                            text: 'Registered Successfully',
                            type: 'info',
                            layout: 'topCenter',
                            timeout: 1000
                        }
                    );
                    window.location.replace('#/');
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
            return this._model.logout()
                .then(function () {
                    credentials.clearStorage();
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

        UserController.prototype.attachUserHandlers = function attachUserHandlers(selector) {
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
