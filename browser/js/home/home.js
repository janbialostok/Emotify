'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, $state) {
	$scope.goSignup = function () {
		$state.go('signup');
	}
	$scope.goLanding = function () {
		$state.go('landing');
	}
});