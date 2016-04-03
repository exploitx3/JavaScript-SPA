$.get('template.html', function (data) {
    var obj = {
        persons: [
            {
                name: 'Garry Finch',
                jobTitle: 'Obshtak',
                website: 'http://nivata.com'
            }, {
                name: 'Betitu',
                jobTitle: 'Magistralna Feq',
                website: 'http://aha.bg'
            }, {
                name: 'Mark Zukunberguv',
                jobTitle: 'Ailqk',
                website: 'http://facebook.com'
            }]
    };
    var template = Handlebars.compile(data);
    var elementToAppend = template(obj);
    $('#data').append(elementToAppend);
});