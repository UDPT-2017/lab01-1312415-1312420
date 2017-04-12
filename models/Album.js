const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "require a album name"]
    },
    pictures: [{
        type: String
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cover:{
        type: String,
        required: [true, "require a cover picture "]
    },
    view_count:{
        type: Number,
        default: 0
    }
});

var Album = mongoose.model("albums", AlbumSchema);

module.exports = Album;