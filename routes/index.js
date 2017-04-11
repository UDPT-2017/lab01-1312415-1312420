var express = require('express');
var router = express.Router();
var User = require('.././models/User');

router.get('/', function (req, res) {
    var session = req.session.user_id;
    if(session){
        User.findById(req.session.user_id).then(function (user) {
            res.locals.session = user;
            var text = []
            text.push(req.query.text);
            res.render('index', {
                notices: text,
                page: 'index'
            });
        }).catch(function (e) {
            res.send(e);
        })
    }
    else{
        res.render('index', {
            notices: null,
            page: 'index'
        });
    }
});

module.exports = router;