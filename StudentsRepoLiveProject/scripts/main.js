var app = app || {};
(function (){
    var model = app.models.loadModels('https://baas.kinvey.com/appdata/kid_-JgNwJIdJ-/');
    var viewModel = new app.viewModel.loadViewModel(model);
    viewModel.showAllStudents();
    viewModel.attachEventListeners();
})();