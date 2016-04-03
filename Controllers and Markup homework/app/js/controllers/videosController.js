app.controller('videosController', function ($scope) {
    $scope.sortOrder = 'title';
    $scope.videos = [
        {
            title: 'Course introduction',
            pictureUrl: 'http://softuni.bg/picture.png',
            length: '3:59',
            category: 'IT',
            subscribers: 2,
            date: new Date(2014, 12, 15),
            haveSubtitles: false,
            comments: [
                {
                    username: 'Stan4o Peshev',
                    content: 'Congratulations Nakov',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 6,
                    websiteUrl: 'http://pesho.com/'
                },
                {
                    username: 'Nakov Peshev',
                    content: 'Congratulations To Me',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 6,
                    websiteUrl: 'http://nakov.com/'
                }
            ]
        },
        {
            title: 'Controllers and Markup',
            pictureUrl: 'http://softuni.bg/picture.png',
            length: '4:20',
            category: 'IT',
            subscribers: 3,
            date: new Date(2014, 12, 15),
            haveSubtitles: false,
            comments: [
                {
                    username: 'Pesho Meshev',
                    content: 'Congratulations Nakov',
                    date: new Date(2014, 12, 15, 12, 30, 0),
                    likes: 3,
                    websiteUrl: 'http://mesho.com/'
                }
            ]
        },
        {
            title: 'Routes',
            pictureUrl: 'http://softuni.bg/picture.png',
            length: '3:20',
            category: 'IT',
            subscribers: 4,
            date: new Date(2014, 12, 12),
            haveSubtitles: true,
            comments: [
                {
                    username: 'Pesho Teshev',
                    content: 'Congratulations Pesho',
                    date: new Date(2014, 12, 15, 15, 30, 0),
                    likes: 33,
                    websiteUrl: 'http://pesho.com/'
                }
            ]
        }
    ];

    var urlRegex = /(http:\/\/)|(https:\/\/)/;
    $scope.urlRegex = urlRegex;

    $scope.urlCheckPattern = function () {
        if ($scope.video && $scope.video.pictureUrl && !urlRegex.test($scope.video.pictureUrl)) {
            return true;
        } else {
            return false;
        }
    };

    $scope.addVideoFunc = function () {
        $scope.video.date = new Date();
        $scope.video.comments= [];
        var newVideo = JSON.parse(JSON.stringify($scope.video));
        $scope.videos.push(newVideo);
    };


});
app.filter('prop', function prop() {
    return function (input, prop) {
        if(input.prop){
            return true;
        }else{
            return false;
        }
    }
});