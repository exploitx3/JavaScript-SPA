var app = app || {};
app.data = (function () {

    function Data(ajaxRequester) {
        this.ajaxRequester = ajaxRequester;
        this.posts = new Posts(ajaxRequester);
        this.users = new Users(ajaxRequester);
    }

    var credentials = (function () {

        function getBaseAppUrl() {
            return 'https://baas.kinvey.com/appdata/kid_Wy0u36CI1Z/';
        }

        function getBaseUserUrl() {
            return 'https://baas.kinvey.com/user/kid_Wy0u36CI1Z/';
        }

        function getSessionToken() {
            return sessionStorage.getItem('SessionAuthToken');
        }

        function setSessionToken(token) {
            if (!sessionStorage.getItem('SessionAuthToken')) {
                sessionStorage.setItem('SessionAuthToken', token);
            }
        }

        function getUserId() {
            return sessionStorage.getItem('UserId');
        }

        function setUserId(usrId) {
            if (!sessionStorage.getItem('UserId')) {
                sessionStorage.setItem('UserId', usrId);
            }
        }

        function getUsername() {
            return sessionStorage.getItem('Username');
        }

        function setUsername(username) {
            if (!sessionStorage.getItem('Username')) {
                sessionStorage.setItem('Username', username);
            }
        }

        function clearStorage() {
            sessionStorage.removeItem('SessionAuthToken');
            sessionStorage.removeItem('UserId');
            sessionStorage.removeItem('Username');
        }

        return {
            getBaseAppUrl: getBaseAppUrl,
            getBaseUserUrl: getBaseUserUrl,
            getSessionToken: getSessionToken,
            setSessionToken: setSessionToken,
            getUserId: getUserId,
            setUserId: setUserId,
            getUsername: getUsername,
            setUsername: setUsername,
            clearStorage: clearStorage
        };
    })();

    var Users = (function () {

        function Users(ajaxRequester){
            this.ajaxRequester = ajaxRequester;
        }

        Users.prototype.login = function login(username, password) {
            var defer = Q.defer();
            var data = {
                username: username,
                password: password
            };

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic a2lkX1d5MHUzNkNJMVo6MWU0OTg1ZjU0ZjkxNGFjN2FkNGJiODMxYjhjZWE4ZDg='
            };

            this.ajaxRequester.makePostRequest(credentials.getBaseUserUrl() + 'login', headers, data)
                .then(function (data) {


                    credentials.clearStorage();
                    credentials.setSessionToken(data._kmd.authtoken);
                    credentials.setUserId(data._id);
                    credentials.setUsername(data.username);
                    defer.resolve(data);

                }, function (error) {
                    defer.reject(error);
                });


            return defer.promise;
        };

        Users.prototype.register = function register(username, password, name, aboutInfo, gender, picture) {
            var defer = Q.defer();
            var data = {
                username: username,
                password: password,
                name: name,
                about: aboutInfo,
                gender: gender,
                picture: picture
            };

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic a2lkX1d5MHUzNkNJMVo6MWU0OTg1ZjU0ZjkxNGFjN2FkNGJiODMxYjhjZWE4ZDg='
            };

            this.ajaxRequester.makePostRequest(credentials.getBaseUserUrl(), headers, data)
                .then(function (data) {
                    credentials.clearStorage();
                    credentials.setSessionToken(data._kmd.authtoken);
                    credentials.setUserId(data._id);
                    credentials.setUsername(data.username);

                    defer.resolve(data);
                });


            return defer.promise;
        };

        Users.prototype.editProfile = function editProfile(data) {
            var data = data || {};
            var defer = Q.defer();
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            this.ajaxRequester.makePutRequest(credentials.getBaseUserUrl() + credentials.getUserId(), headers, data)
                .then(function (info) {
                    defer.resolve(info);
                })
                .done();
            //TODO: I'm not sure if the info in the database will change completeley makeing the session useless
            return defer.promise;
        };

        Users.prototype.deleteProfile = function deleteProfile() {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            this.ajaxRequester.makeDeleteRequest(credentials.getBaseUserUrl() + credentials.getUserId() + '/?hard=true', headers)
                .then(function (info) {
                    defer.resolve(info);
                })
                .done();
            return defer.promise;
        };

        Users.prototype.getById = function getById(id) {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            var responseData = this.ajaxRequester.makeGetRequest(credentials.getBaseUserUrl() + id, headers)
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    console.error(error);
                });

            return defer.promise;
        };

        Users.prototype.validateLoggedIn = function validateLoggedIn() {
            return sessionStorage.hasOwnProperty('SessionAuthToken');
        };

        Users.prototype.getUserData = function getUserData() {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            this.ajaxRequester.makeGetRequest(credentials.getBaseUserUrl() + credentials.getUserId(), headers)
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    console.error(error);
                });

            return defer.promise;
        };

        Users.prototype.logout = function logout() {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            this.ajaxRequester.makePostRequest(credentials.getBaseUserUrl() + '_logout', headers)
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    console.error(error);
                });

            credentials.clearStorage();

            return defer.promise;
        };

        return Users;
    })();

    var Posts = (function () {

        function Posts(ajaxRequester) {
            this.ajaxRequester = ajaxRequester;
        }

        Posts.prototype.getAllPosts = function getAllPosts() {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            var responseData = this.ajaxRequester.makeGetRequest(credentials.getBaseAppUrl() + 'Posts/?resolve=createdBy', headers)
                .then(function (data) {
                    defer.resolve(data);
                    return data;
                }, function (error) {
                    console.error(error);
                });

            return defer.promise;
        };

        Posts.prototype.getPostById = function getPostById(id) {
            var defer = Q.defer();
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken()
            };

            this.ajaxRequester.makeGetRequest(credentials.getBaseAppUrl() + 'Posts/' + id, headers)
                .then(function (data) {
                    defer.resolve(data);
                    return data;
                }, function (error) {
                    console.error(error);
                });

            return defer.promise;
        };

        Posts.prototype.addNewPost = function addNewPost(newPostData) {
            var defer = Q.defer();
            var newPostData = newPostData || {};
            var headers = {
                'Authorization': 'Kinvey ' + credentials.getSessionToken(),
                'Content-Type': 'application/json'
            };

            this.ajaxRequester.makePostRequest(credentials.getBaseAppUrl() + 'Posts/', headers, newPostData)
                .then(function (data) {
                    defer.resolve(data);
                }, function (error) {
                    console.error(error);
                });

            return defer.promise;
        };

        return Posts;
    })();

    return {
        get: function (requester) {
            return new Data(requester);
        }
    };
})();