function generateTable(inputJSON) {
    "use strict";
    var table = $('<table></table>');
    var addedSectionsToTable = [];
    inputJSON.forEach(function (data) {
        for (var key in data) {
            if (addedSectionsToTable.indexOf(key) == -1) {
                addedSectionsToTable.push(key);
            }
        }
    });
    var sectionsTr = $('<tr></tr>');
    addedSectionsToTable.forEach(function (key) {
        var key = String(key);
        key = key[0].toUpperCase() + key.substring(1);
        $('<th></th>').text(key).appendTo(sectionsTr);
    });
    table.append(sectionsTr);
    inputJSON.forEach(function (data) {
        var rowToAppend = $('<tr></tr>');
        for (var key in addedSectionsToTable) {
            if(data.hasOwnProperty(addedSectionsToTable[key])){
                rowToAppend.append($('<td></td>').text(data[addedSectionsToTable[key]]));
            }else{
                rowToAppend.append($('<td></td>').text(''));
            }
        }
        table.append(rowToAppend);
    });

    $('main').append(table);

}

generateTable([
    {"manufacturer": "BMW", "model": "E92 320i", "year": 2011, "price": 50000, "class": "Family"},
    {"manufacturer": "Porsche", "model": "Panamera", "year": 2012, "price": 100000, "class": "Sport"},
    {"manufacturer": "Peugeot", "model": "305", "price": 1000, "class": "Family"},
    {"manufacturer": "Peugeot", "model": "305", "price": 1000, "class": "Family", "Shibidah":'YES'}
]);