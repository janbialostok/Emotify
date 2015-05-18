'use strict';
var colors = require('css-color-names');

var router = require('express').Router();
module.exports = router;

router.get('/', function (req, res) {
    res.json(colors);
});