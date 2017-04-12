var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Blog = require('../models/Blog');
router.get('/', function (req, res) {
    var blogs;
    Blog.find({}).populate('author').then(function (result) {
        res.render('blogs/blog', {
            page: 'blog',
            blogs: result
        });
    });
});
router.get('/new', function (req, res) {
    res.render('blogs/new', {
        page: 'blog'
    });
});
router.post('/new', function (req, res) {
    var body = _.pick(req.body, ['title', 'content', 'user']);
    var blog = new Blog(
        {
            title: body.title,
            content: body.content,
            author: body.user
        }
    )
    blog.save().then(function (blog) {
        res.redirect(`/blog/${blog.id}`);
    }).catch(function (e) {
        var messages = [];
        if (e.errors.content) {
            messages.push(e.errors.content.message);
        }
        if (e.errors.title) {
            messages.push(e.errors.title.message);
        }
        res.render('blogs/new', {
            page: 'blogs',
            notices: messages
        })
    });
});
router.get('/:id', function (req, res) {
    Blog.findById(req.params.id).populate('author').populate('comments.author').then(function (blog) {
        blog.view_count ++;
        blog.save().then(function (blog) {
            res.render('blogs/show', {
                blog: blog,
                page: 'blog'
            })
        })
    }).catch(function (e) {
        res.send(e);
    });
});
router.post('/:id', function (req, res) {
    var body = _.pick(req.body, ['id', 'text']);

    Blog.findById(req.params.id).populate('author').populate('comments.author').then(function (blog) {
        if(body.text) {
            blog.comments.push({
                author: body.id,
                text: body.text
            });
            blog.save().then(function (blog) {
                res.redirect(`/blog/${blog.id}`);
            })
        } else {
            blog
            res.render('blogs/show', {
                blog: blog,
                page: 'blog',
                notices: ["need to write something in the comment"]
            })
        }

    })
});
module.exports = router;