var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var exphbs  = require('express-handlebars');

var app = express();
app.use(express.static(__dirname + '/public'));
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

var routes = require('./routes/index');
app.get('/',routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('connect to localhost:3000');
});