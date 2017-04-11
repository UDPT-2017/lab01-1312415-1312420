var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        notice: null,
        page: 'index'
    });
});

module.exports = router;