'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'js/signup/signup.html'
    });
});

app.controller('SignupCtrl', function ($scope, $state) {
});