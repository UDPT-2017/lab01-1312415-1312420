var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var exphbs  = require('express-handlebars');
var cookieSession = require('cookie-session');


var mongoose = require('./db/mongoose');
var User = require('./models/User');
var user = require('./routes/user');
var blog = require('./routes/blog');
var album = require('./routes/album');
var about = require('./routes/about');
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var authenticate = require('./authenticate');

var app = express();
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

app.use('/',index);
app.use('/about',authenticate , about);
app.use('/album',authenticate, album);
app.use('/blog',authenticate, blog);
app.use('/user', user);
app.use('/login',login);
app.use('/logout',logout);










app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('connect to localhost:3000');
});