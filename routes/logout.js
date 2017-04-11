var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    req.session.user_id = null;
    res.redirect('/');
});

module.exports = router;