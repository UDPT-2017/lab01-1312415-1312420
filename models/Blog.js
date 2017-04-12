const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');

const BlogSchema = mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: [true, "require content"],
        minlength: [10, "content is shorter than 10 letters"]
    },
    title: {
        type: String,
        trim: true,
        required: [true, "require title"],
        minlength: [3, "title is shorter than 3 letters"]
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    view_count:{
        type: Number,
        default: 0
    },
    comments:[{
        author:{
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text:{
            type: String
        }
    }]


});

var Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;