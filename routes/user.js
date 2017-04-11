var express = require('express');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'du27rtoxp',
    api_key: '961163633288279',
    api_secret: 'E40LT_jwdgycmLksE37Gql21E5M'
});

var User = require('../models/User');
var authenticate = require('.././authenticate');

var router = express.Router();
router.get('/me', authenticate, function (req, res) {
    if (req.user) {
        res.render('user_page');
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
var userBodyHandle = function (req, res, result) {
    var body = _.pick(req.body, ['email', 'password', 'name']);
    var user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        avatar: result.url
    });

    user.save().then(function (user) {
        req.session.user_id = user.id;
        req.session.save();
        var string = encodeURIComponent('new user is added');
        res.redirect('/?text=' + string);


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
}
router.post('/', multipartMiddleware, function (req, res) {
    cloudinary.uploader.upload(req.files.avatar.path, function(result) {
        if(!result){
            res.render('register', {
                page: 'index',
                notices: ["need an avatar"]
            })
        }else{
            userBodyHandle(req, res, result);
        }
    })

});

module.exports = router;