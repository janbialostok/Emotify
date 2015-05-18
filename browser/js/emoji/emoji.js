'use strict';
app.config(function ($stateProvider) {

    $stateProvider.state('emoji', {
        url: '/create',
        controller: 'EmojiCtrl',
        templateUrl: 'js/emoji/emoji.html'
    });
});

app.controller('EmojiCtrl', function ($scope, $state, $window, ImageFactory) {
	$scope.captured = false;
	$scope.canvas = document.getElementById('canvas');
	$scope.video = document.getElementById('video');
	$scope.goBack = function () {
		$scope.stream.stop();
		$state.go('landing');
	}
	$scope.redo = function () {
		$scope.captured = false;
		var context = $scope.canvas.getContext('2d');
		context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
	}
	$scope.process = function () {
		ImageFactory.imgConvert($scope.canvas)
			.then(function (img) {
				ImageFactory.colorTrack(img)
					.then(function (palette) {
						console.log(palette);
						var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']),
				            features = {};
				        tracker.on('track', function (event) {
				            if (event.data.length === 0) throw new Error('No features found');
				            else {
				                event.data.forEach(function (feat, index) {
				                    features['feature_' + index] = feat;
				                });
				            }
				        });
				        tracking.track('#canvas', tracker);
				        console.log("Facial", features);
					});
			});
	}

	var startStream = function (stream) {
		$scope.stream = stream;	
		$scope.video.src = $window.URL.createObjectURL(stream);
		$scope.video.play();
	}

	$scope.ready = function () {
		
		$scope.videoStart = true;

		var videoObj = { 'video': true },
			errFunc = function (err) {
				console.log('Video capture error: ', err.code);
			};
		
		var nav = $window.navigator;

		if (nav.getUserMedia) {
			nav.getUserMedia(videoObj, function (stream) {
				startStream(stream);
			}, errFunc);
		}
		else if (nav.webkitGetUserMedia) {
			nav.webkitGetUserMedia(videoObj, function (stream) {
				startStream(stream);
			}, errFunc);
		}
		else if (nav.mozGetUserMedia) {
			nav.mozGetUserMedia(videoObj, function (stream) {
				startStream(stream);
			}, errFunc);
		}
		else {
			alert('Browser does not support webcam feature');
			$state.go('landing', { id: 'test' });
		}

		$scope.snap = function () {
			var video = angular.element($scope.video),
				currentWidth = ($(video).css('width')).split('p')[0],
				currentHeight = ($(video).css('height')).split('p')[0];
			var canvas = angular.element($scope.canvas);
			$(canvas).attr('height', currentHeight);
			$(canvas).attr('width', currentWidth);
			var context = $scope.canvas.getContext('2d');
			context.drawImage($scope.video, 0, 0, currentWidth, currentHeight);
			$scope.captured = true;
		}
	}

});