var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require('../models/User');


var authenticate = function (req, res, next) {
    var session = req.session.user_id;
    if(session){
        User.findById(req.session.user_id).then(function (user) {
            req.user = user;
            next();
        }).catch(function (e) {
            console.log(e);
        })
    }
    else{
        res.send("asd");
    }

}


router.get('/me', authenticate, function (req, res) {
    if (req.user) {
        res.send(req.user);
    }
    else {
        res.render('register')
    }
});
router.get('/', function (req, res) {
    res.render('register',{
        page: 'register'
    });
});
router.post('/', function (req, res) {
    var body = _.pick(req.body, ['email', 'password', 'name']);
    var user = new User({
        name: body.name,
        email: body.email,
        password: body.password
    });

    user.save().then(function (user) {
        req.session.user_id = user.id;
        req.session.save();
        res.render('index', {
            page: 'index',
            notices: ['new user is added']
        });


    }).catch(function (e) {
        var messages = [];

        if (e.errors.password) {
            messages.push(e.errors.password.message);
        }
        if (e.errors.email) {
            messages.push(e.errors.email.message);
        }
        if (e.errors.name) {
            messages.push(e.errors.name.message);
        }
        res.render('register', {
            page: 'index',
            notices: messages
        })
    });
});

module.exports = router;