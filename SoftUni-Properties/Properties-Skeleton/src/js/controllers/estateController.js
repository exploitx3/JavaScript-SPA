define('estateController', ['jquery', 'noty'], function ($, noty) {

    var EstateController = (function () {
        function EstateController(model, views) {
            this.model = model;
            this.viewsBag = views;
        }

        EstateController.prototype.loadListEstatesPage = function loadListEstatesPage(selector) {
            var _this = this;
            return this.model.listAllEstates()
                .then(function (data) {
                    var modifiedData = [];
                    data.forEach(function (item) {
                        item.encodedName = encodeURI(item.name);
                        item.encodedCategory = encodeURI(item.category);
                        modifiedData.push(item);
                    });

                    _this.viewsBag.loadEstatesView(selector, modifiedData);
                })
                .done();
        };

        EstateController.prototype.loadfilterEstates = function loadfilterEstates(keyword, minPrice, maxPrice, category) {
            var selector = '#main';
            var _this = this;
            return this.model.filterEstates(keyword, minPrice, maxPrice, category)
                .then(function (data) {
                    var modifiedData = [];
                    data.forEach(function (item) {
                        item.encodedName = encodeURI(item.name);
                        item.encodedCategory = encodeURI(item.category);
                        modifiedData.push(item);
                    });
                    modifiedData = modifiedData.filter(function (item) {
                        if (item.name.indexOf(keyword) !== -1) {
                            return true;
                        }
                        return false;
                    });

                    _this.viewsBag.loadEstatesView(selector, modifiedData);
                })
                .done();
        };

        EstateController.prototype.loadAddEstatePage = function loadAddEstatePage(selector) {
            this.viewsBag.loadAddEstateView(selector);
        };

        EstateController.prototype.loadEditEstatePage = function loadEditEstatePage(selector, urlParams) {
            var data = decodeURI(urlParams).split('&');
            var outData = {
                _id: data[0].split('id=')[1],
                name: data[1].split('name=')[1],
                category: data[2].split('category=')[1],
                price: data[3].split('price=')[1]
            };
            return this.viewsBag.loadEditEstateView(selector, outData);
        };

        EstateController.prototype.loadDeleteEstatePage = function loadDeleteEstatePage(selector, urlParams) {
            var data = decodeURI(urlParams).split('&');
            var outData = {
                _id: data[0].split('id=')[1],
                name: data[1].split('name=')[1],
                category: data[2].split('category=')[1],
                price: data[3].split('price=')[1]
            };
            this.viewsBag.loadDeleteEstateView(selector, outData);
        };

        EstateController.prototype.addEstate = function addEstate(name, category, price) {
            var name = name;
            var category = category;
            var price = price;
            return this.model.addEstate(name, category, price)
                .then(function (data) {
                    noty({
                        text: 'Estate Added Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/estates/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Add Estate: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        EstateController.prototype.editEstate = function editEstate(id, name, category, price) {
            var name = name;
            var category = category;
            var price = price;
            return this.model.editEstate(id, name, category, price)
                .then(function (data) {
                    noty({
                        text: 'Estate Edited Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/estates/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Edit Estate: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        EstateController.prototype.deleteEstate = function deleteEstate(id) {
            return this.model.deleteEstate(id)
                .then(function (data) {
                    noty({
                        text: 'Estate Deleted Successfully',
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                    window.location.replace('#/estates/');
                }, function (error) {
                    var errMsg = error.responseJSON.error;
                    noty({
                        text: 'Cannot Delete Estate: ' + errMsg,
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000
                    });
                });
        };

        EstateController.prototype.attachEstatesHandlers = function attachEstatesHandlers() {
            var selector = '#main';
            attachAddEstateHandler(selector, this);
            attachEditEstateHandler(selector, this);
            attachDeleteEstateHandler(selector, this);
            attachFilterEstatesHandler(selector, this);
            attachClearFilterHandler(selector, this);
        };

        function attachAddEstateHandler(selector, controller) {
            $(selector).on('click', '#add-estate-button', function () {
                var name = $('#name').val();
                var category = $('#category').val();
                var price = Number($('#price').val());
                return controller.addEstate(name, category, price);
            })
        }

        function attachEditEstateHandler(selector, controller) {
            $(selector).on('click', '#edit-estate-button', function () {
                var id = (decodeURI(window.location.hash)).split('&')[0].split('id=')[1];
                var name = $('#item-name').val();
                var category = $('#category').val();
                var price = Number($('#price').val());
                return controller.editEstate(id, name, category, price);
            })
        }

        function attachDeleteEstateHandler(selector, controller) {
            $(selector).on('click', '#delete-estate-button', function () {
                var id = window.location.hash.split('#/delete-estate/id=')[1].split('&')[0];
                return controller.deleteEstate(id);
            })
        }

        function attachFilterEstatesHandler(selector, controller) {
            $(selector).on('click', '#filter', function () {
                var keyword = $('#search-bar').val();
                var minPrice = $('#min-price').val();
                var maxPrice = $('#max-price').val();
                var category = $('#category').val();
                return controller.loadfilterEstates(keyword, minPrice, maxPrice, category);
            });
        }

        function attachClearFilterHandler(selector, controller) {
            $(selector).on('click', '#clear-filters', function () {
                var keyword = $('#search-bar').val('');
                var minPrice = $('#min-price').val(0);
                var maxPrice = $('#max-price').val(100000000);
                var category = $('#category').val('All');
            });
        }

        return EstateController;
    })();

    return {
        load: function (model, views) {
            return new EstateController(model, views);
        }
    }
});