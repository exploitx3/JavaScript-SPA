var app = app || {};
app.model = (function () {
    function StudentsRepoModel(baseUrl) {
        this._requester = app.requester.load(baseUrl);
        this.studentsRepo = {
            students: []
        };
    }

    StudentsRepoModel.prototype.getStudents = function getStudents() {
        var _this = this;
        var defer = Q.defer();
        this.studentsRepo.students.length = 0;
        this._requester.get('Students/')
            .then(function (data) {
                data.forEach(function (student) {
                    var student = new Student(student.name, student.grade, student.id);
                    _this.studentsRepo.students.push(student);
                });

                defer.resolve(_this.studentsRepo);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function (baseUrl) {
            return new StudentsRepoModel(baseUrl);
        }
    };
})();