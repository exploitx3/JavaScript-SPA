var app = app || {};
app.controller = (function () {
    function BaseController(data) {
        this._data = data;
    }

    BaseController.prototype.loadHeader = function loadHeader(selector) {
        if (this._data.users.validateLoggedIn()) {
            this._data.users.getUserData()
                .then(function (userData) {
                    //this._data.users.getById(userData._id)
                    //    .then(function (data) {
                    $.get('./views/user-header.html', function (view) {
                            var template = Handlebars.compile(view);
                            var output = template(userData);
                            $(selector).empty();
                            $(selector).html(output);
                        })
                        .done();
                });
        } else {
            $(selector).empty();
        }
    };

    BaseController.prototype.loadHome = function loadHome(selector) {
        if (this._data.users.validateLoggedIn()) {
            this._data.posts.getAllPosts()
                .then(function (posts) {
                    $.get('./views/posts.html', function (view) {
                        var template = Handlebars.compile(view);
                        var output = template({posts: posts});
                        //$('#header').empty();
                        $('#main').empty();
                        $(selector).html(output);
                    });
                });
        } else {
            $.get('./views/default-home.html', function (view) {
                var template = Handlebars.compile(view);
                var output = template();
                $(selector).html(output);
            })
        }
    };

    BaseController.prototype.loadEditProfile = function loadEditProfile(selector) {
        if (this._data.users.validateLoggedIn()) {
            this._data.users.getUserData()
                .then(function(data){
                    $.get('./views/edit-profile.html', function (view) {
                        var template = Handlebars.compile(view);
                        var output = template(data);
                        $(selector).html(output);
                    });
                });
        } else {
            $.get('./views/default-home.html', function (view) {
                var template = Handlebars.compile(view);
                var output = template();
                $(selector).html(output);
            })
        }
    };

    BaseController.prototype.logout = function loadLogout(selector) {
        if (this._data.users.validateLoggedIn()) {
            this._data.users.logout();
        }
    };

    BaseController.prototype.loadLogin = function loadLogin(selector) {
        $.get('./views/login.html', function (view) {
            var template = Handlebars.compile(view);
            var output = template();
            $(selector).html(output);
        })
    };

    BaseController.prototype.loadRegister = function loadRegister(selector) {
        $.get('./views/register.html', function (view) {
            var template = Handlebars.compile(view);
            var output = template();
            $(selector).html(output);
        })
    };

    BaseController.prototype.loadPostBox = function loadRegister(selector) {
        $.get('./views/post-box.html', function (view) {
            var template = Handlebars.compile(view);
            var output = template();
            $(selector).append(output);
        })
    };

    function attachLoginHandler(selector) {
        var _this = this;
        $(selector).on('click', '#login-button', function () {
            var username = $('#login-username').val();
            var password = $('#login-password').val();
            _this._data.users.login(username, password)
                .then(function (data) {
                    window.location.href = '#/';
                    poppy.pop('success', 'Logged IN', 'You successfully logged in');
                }, function (error) {
                    poppy.pop('error', 'Error', 'Wrong Username or Password');
                })
        })
    }

    function attachRegisterHandler(selector) {
        var _this = this;
        $(selector).on('click', '#register-button', function () {
            var username = $('#reg-username').val();
            var password = $('#reg-password').val();
            var name = $('#reg-name').val();
            var about = $('#reg-about').val();
            var gender = $('input:radio[name=gender-radio]:checked').val();
            var picture = $('.picture-preview').attr('src');
            _this._data.users.register(username, password, name, about, gender, picture)
                .then(function (data) {
                    window.location.href = '#/';
                    poppy.pop('success', 'Registered', 'You successfully Registered in');
                }, function (error) {
                    poppy.pop('error', 'Error', 'Something went wrong');
                })
        })
    }

    function attachPostHandler(selector) {
        var _this = this;
        $(selector).on('click', '#post-button', function () {
            var postContent = $('#post-content').val();
            var postDate = Date();
            var createdBy = {
                '_type': 'KinveyRef',
                '_id': sessionStorage.getItem('UserId'),
                '_collection': 'user'
            };
            var postData = {content: postContent, postDate: postDate, createdBy: createdBy};
            _this._data.posts.addNewPost(postData)
                .then(function (data) {
                    window.location.href = '#/';
                    poppy.pop('success', 'Posted', 'You successfully posted on the wall');
                }, function (error) {
                    poppy.pop('error', 'Error', 'Something went wrong');
                })
        })
    }

    function attachSaveChangesHandler(selector) {
        var _this = this;
        $(selector).on('click', '#save-changes', function () {
            var username = $('#username').val();
            var password = $('#password').val();
            var name = $('#name').val();
            var about = $('#about').val();
            var gender = $('input:radio[name=gender-radio]:checked').val();
            var picture = $('.picture-preview').attr('src');
            var obj = {
                username:username,
                password:password,
                name:name,
                about:about,
                gender:gender,
                picture:picture
            };
            _this._data.users.deleteProfile()
                .then(function () {
                    _this._data.users.register(username, password, name, about, gender, picture)
                        .then(function (data) {
                            //sessionStorage.clear();
                            window.location.href = '#/';
                            poppy.pop('success', 'Editted', 'You successfully Editted your profile');
                        }, function (error) {
                            poppy.pop('error', 'Error', 'Something went wrong');
                        })
                })
                .done();
        })
    }


    BaseController.prototype.attachEventHandlers = function attachEventHandlers() {
        var selector = '#main';

        attachLoginHandler.call(this, selector);
        attachRegisterHandler.call(this, selector);
        attachPostHandler.call(this, '#header');
        attachSaveChangesHandler.call(this, selector);
    };


    return {
        get: function (data) {
            return new BaseController(data);
        }
    }
})();