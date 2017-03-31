var express = require('express');
var router = express.Router();

router.get('/blog', function(req, res) {
    res.render('blog',{
        page: 'blog'
    });
});

module.exports = router;