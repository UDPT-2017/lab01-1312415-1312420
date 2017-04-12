var express = require('express');
var router = express.Router();
var Album = require('../models/Album');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'du27rtoxp',
    api_key: '961163633288279',
    api_secret: 'E40LT_jwdgycmLksE37Gql21E5M'
});

router.get('/', function (req, res) {
    Album.find({}).populate('author').then(function (result) {
        res.render('albums/album', {
            page: 'album',
            albums: result
        });
    });
});
router.get('/new', function (req, res) {
    res.render('albums/new', {
        page: 'album'
    })
});
router.post('/new',multipartMiddleware, function (req, res) {
    cloudinary.uploader.upload(req.files.cover.path, function (result) {
        var body = _.pick(req.body, ['name', 'user']);
        var album = new Album(
            {
                name: body.name,
                author: body.user,
                cover: result.url
            }
        );
        album.save().then(function (album) {
            res.redirect(`/album/${album.id}`);
        }).catch(function (e) {
            var messages = [];
            if (e.errors.name) {
                messages.push(e.errors.content.message);
            }
            if (e.errors.cover) {
                messages.push(e.errors.content.message);
            }
            res.render('albums/new', {
                page: 'album',
                notices: messages
            })
        })
    });
});
router.get('/:id', function (req, res) {
    Album.findById(req.params.id).populate('author').then(function (album) {
        res.render('albums/show', {
            album: album,
            page: 'album'
        })
    })
});
router.post('/:id', multipartMiddleware, function (req, res) {
    Album.findById(req.params.id).populate('author').then(function (album) {
        cloudinary.uploader.upload(req.files.picture.path, function (result) {
            if (!result) {
                res.render('albums/show', {
                    album: album,
                    page: 'album',
                    notices: ["need a picture"]
                })
            } else {
                album.pictures.push(result.url);
                album.save().then(function (album) {
                    res.redirect(`/album/${album.id}`)
                })

            }
        })
    })
});

module.exports = router;