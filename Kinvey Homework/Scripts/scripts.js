(function ($) {
    var getHttpRequest = (function () {
        var xmlHttpFactories;
        xmlHttpFactories = [
            function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        ];
        return function () {
            var xmlFactory, _i, _len;
            for (_i = 0, _len = xmlHttpFactories.length; _i < _len; _i++) {
                xmlFactory = xmlHttpFactories[_i];
                try {
                    return xmlFactory();
                } catch (_error) {

                }
            }
            return null;
        };
    })();
    var xhrRequester = getHttpRequest();
    function getCountries(xhrRequester) {

        var countries;
        xhrRequester.onreadystatechange = function () {
            if (xhrRequester.readyState === 4) {
                var statusType = Math.floor(xhrRequester.status / 100);
                if (statusType === 2) {
                    countries = JSON.parse(xhrRequester.responseText);
                } else {
                    console.error('Bad Request with error code:' + xhrRequester.status);
                }
            }
        };
        xhrRequester.open('GET', 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/CountriesCollection', false);
        xhrRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        xhrRequester.setRequestHeader('Accept', 'application/json');
        xhrRequester.send(null);

        var defer = Q.defer();
        defer.resolve(countries);
        return defer.promise;
    }
    function addCountriesToDom(countries) {
        var selectCountriesElem = $("#countries");
        countries.forEach(function (country) {
            var option = $('<option>');
            option.attr('value', country.name);
            option.text(country.name);
            selectCountriesElem.append(option);
        });
    }
    Q.fcall(getCountries, xhrRequester).then(addCountriesToDom)
        .done();


    function refreshCountry() {
        $("#countries").empty();
        getCountries(xhrRequester)
            .then(addCountriesToDom)
            .done();
    }

    $('#refreshCountriesButton').on('click', refreshCountry);

    function addCountry() {
        var countryName = $('#countryName').val();
        xhrRequester.open('POST', 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/CountriesCollection', false);
        xhrRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        xhrRequester.setRequestHeader('Content-Type', 'application/json');
        var data = {'name': countryName};
        xhrRequester.send(JSON.stringify(data));
    }

    $('#addCountryButton').on('click', addCountry);
    function changeCountryName() {
        var oldName = $('#countries option:selected').text();

        var deleteUrl = 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/CountriesCollection/?query={"name":"' + oldName + '"}';
        xhrRequester.open('DELETE', deleteUrl, false);
        xhrRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        xhrRequester.send(null);


        var countryName = $('#countryName').val();
        xhrRequester.open('POST', 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/CountriesCollection', false);
        xhrRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        xhrRequester.setRequestHeader('Content-Type', 'application/json');
        var data = {'name': countryName};
        xhrRequester.send(JSON.stringify(data));
    }

    $('#changeCountryNameButton').on('click', changeCountryName);

    function deleteCountry() {
        var countryName = $('#countryName').val();
        var deleteUrl = 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/CountriesCollection/?query={"name":"' + countryName + '"}';
        xhrRequester.open('DELETE', deleteUrl, false);
        xhrRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        xhrRequester.send(null);
    }

    $('#deleteCountryButton').on('click', deleteCountry);
    function showCountryInfo() {
        var townsCaption = $('<h3>Towns</h3><br>');
        var townsUL = $('<ul>');

        var countryName = $('#countries option:selected').text();
        var getTownsByCountryURL = 'https://baas.kinvey.com/appdata/kid_bkxEKBIg1b/TownsCollection/?query={"country":"' + countryName + '"}';
        var xhrNewRequester = getHttpRequest();
        xhrNewRequester.open('GET', getTownsByCountryURL, false);
        xhrNewRequester.setRequestHeader('Authorization', 'Basic ZXhwcDpleHA=');
        var towns;
        xhrNewRequester.onreadystatechange = function () {
            if (xhrNewRequester.readyState === 4) {
                var statusType = Math.floor(xhrNewRequester.status / 100);
                if (statusType === 2) {
                    towns = JSON.parse(xhrNewRequester.responseText);
                } else {
                    console.error('Bad Request with error code:' + xhrNewRequester.status);
                }
            }
        };
        xhrNewRequester.send(null);
        var liElem;
        towns.forEach(function (town) {
            liElem = $('<li>');
            liElem.text(town.name);
            townsUL.append(liElem);
        });
        $('#countriesInfo').empty();
        $('#countriesInfo').append(townsCaption).append(townsUL);
    }

    $('#showCountryButton').on('click', showCountryInfo);
})(jQuery);