var express = require('express');
var router = express.Router();

router.get('/album', function(req, res) {
    res.render('album',{
        page: 'album'
    });
});

module.exports = router;