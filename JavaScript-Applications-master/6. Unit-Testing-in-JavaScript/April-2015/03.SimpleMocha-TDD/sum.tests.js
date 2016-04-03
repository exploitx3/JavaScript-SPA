suite('Person', function() {
        var person;

        before(function () {
            person = new Person('Peter', 'Petrov');
        });

        suite('when initializing', function(){
        test('with valid names, expect ok', function(){
            var person = new Person('Peter', 'Petrov');
            expect(person.firstname()).to.equal('Peter');
            expect(person.lastname()).to.equal('Petrov');
        });
    });
});
