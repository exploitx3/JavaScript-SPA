var app = app || {};
app.viewModel = (function () {
    function ViewModel(model) {
        this.model = model;
    }


    ViewModel.prototype.showAllStudents = function showAllStudents() {
        var _this = this;
        this.model.students.getAllStudents(
            function (studentData) {
                studentData.forEach(function (student) {
                    $('#students-container').append(_this.addStudentToDom(student));
                });
            },
            function (error) {
                console.error(error.responseText);
            }
        );
    };

    ViewModel.prototype.addStudentToDom = function addStudentToDom(student){
        var studentWrapper = $('<div />').addClass('student-list');
        studentWrapper.attr('data-id', student._id);
        var studentName = $('<p/>').text(student.name);
        var studentGrade = $('<p/>').text(student.grade);
        var deleteButton = $('<button class="delete-student">Delete Me</button>');
        var _this = this;
        deleteButton.on('click', function () {
            var idToDeleteElem = this.parentElement;
            var idToDelete = idToDeleteElem.attributes['data-id'].value;

            _this.deleteStudent(idToDelete);

        });
         studentWrapper
            .append(studentName)
            .append(studentGrade)
            .append(deleteButton);

        return studentWrapper;
    };

    ViewModel.prototype.deleteStudent = function deleteStudent(id){
       this.model.students.removeStudent(id, function (data) {
           console.log(data);
           $('#students-container')
               .find('[data-id=' + id + ']')
               .remove();
       }, function (error) {
           console.error(error);
       });
    };


    ViewModel.prototype.addStudent = function addStudent() {
        var studentName = $('#student-name').val();
        var studentGrade = +$('#student-grade').val();
        var _this = this;
        this.model.students.postStudent({name: studentName, grade: studentGrade},
            function (data) {
                console.log(data);
                $('#students-container').append(_this.addStudentToDom(data));
            },
            function (error) {
                console.error(error.responseText);
            })
    };

    ViewModel.prototype.attachEventListeners = function attachEventListeners() {
        $('#add-student').click(function () {
            //TODO: try to use call to do the same
            this.addStudent();
        });
        $('#wrapper').on('click', '.delete-student', function(){
            alert('delete clicked');
        })
    };

    return {
        loadViewModel: function (model) {
            return new ViewModel(model);
        }
    }
})();