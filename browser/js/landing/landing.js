'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('landing', {
        url: '/landing/:id',
        controller: 'LandingCtrl',
        templateUrl: 'js/landing/landing.html'
    });
});

app.controller('LandingCtrl', function ($scope, $state) {
	$scope.createEmoji = function () {
		$state.go('emoji');
	}
});