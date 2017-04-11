var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://phan:123456@ds141960.mlab.com:41960/heroku')
    .then(
        console.log('connected to database'))
    .catch(function (e) {
        console.log('error: ' + e);
    })