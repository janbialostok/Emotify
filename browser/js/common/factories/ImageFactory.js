'use strict';
app.factory('ImageFactory', function ($q, $http) {

    var factory = {};

    factory.imgConvert = function (canvas) {
        return $q(function (resolve, reject) {
            var img = new Image();
            img.src = canvas.toDataURL("image/png");
            resolve(img);
        });
    };

    factory.canvasConvert = function (img) {
        return $q(function (resolve, reject) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas);
        });
    };

    factory.saveToFileSystem = function (canvas) {
        var currentDate = new Date(),
            userHash;
        canvas.toBlob(function (blob) {
            saveAs(blob, currentDate + '_' + userHash + '.png');
        });
    };

    factory.facialTrack = function (img) {
        return $q(function (resolve, reject) {
            
        });
    };

    factory.colorTrack = function (img) {
        return $q(function (resolve, reject) {
            var colorThief = new ColorThief();
            resolve(colorThief.getPalette(img, 8));
        });
    };

    factory.emojiConvert = function (img) {

    };

    return factory;

});