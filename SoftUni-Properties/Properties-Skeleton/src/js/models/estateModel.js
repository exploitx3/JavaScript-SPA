define('estateModel', function () {
    var estateModel = (function () {
        function EstateModel(baseUrl, apiKey, requester, headers) {
            this.serviceUrl = baseUrl + 'appdata/' + apiKey + '/Estates/';
            this.requester = requester;
            this.headers = headers;
        }

        EstateModel.prototype.listAllEstates = function listAllEstates() {

            return this.requester.get(this.serviceUrl, this.headers.getHeaders(false, true));
        };

        EstateModel.prototype.filterEstates = function filterEstates(keyword, minPrice, maxPrice, category) {
            var filterUrl;
            if (category === 'All') {
                filterUrl = '?query={"price":{"$gte":' + minPrice + ',"$lte":' + maxPrice + '}}';
            } else {
                filterUrl = '?query={"price":{"$gte":' + minPrice + ',"$lte":' + maxPrice + '}, "$and":[{"category":"' + category + '"}]}';
            }

            var data = this.requester.get(this.serviceUrl + filterUrl, this.headers.getHeaders(false, true));
            return data;
        };

        EstateModel.prototype.addEstate = function addEstate(name, category, price) {
            var data = {
                name: name,
                category: category,
                price: price
            };

            var headers = this.headers.getHeaders(true, true);
            return this.requester.post(this.serviceUrl, headers, data);
        };

        EstateModel.prototype.deleteEstate = function deleteEstate(estateId) {

            return this.requester.remove(this.serviceUrl + estateId, this.headers.getHeaders(false, true));
        };

        EstateModel.prototype.editEstate = function editEstate(estateId, name, category, price) {
            var data = {
                name: name,
                category: category,
                price: price
            };
            var headers = this.headers.getHeaders(true, true);

            return this.requester.put(this.serviceUrl + estateId, headers, data);

        };

        return {
            load: function (baseUrl, apiKey, requester, headers) {
                return new EstateModel(baseUrl, apiKey, requester, headers);
            }
        }
    })();

    return estateModel;
});