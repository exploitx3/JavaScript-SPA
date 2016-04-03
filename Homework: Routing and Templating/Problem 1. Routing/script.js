    router = Sammy(function () {
        this.get('#/', function () {
            $('#info').text('HELLO IT\'S NO ONE.');
        });

        this.get('#/Sammy', function () {
            $('#info').text('HELLO, Sammy.');
        });

        this.get('#/You', function () {
            $('#info').text('HELLO, You.');
        });

        this.get('#/Ti', function () {
            $('#info').text('HELLO, Ti.');
        });

        this.get('#/Mene', function () {
            $('#info').text('HELLO, Mene.');
        });
    });
    router.run('#/');
