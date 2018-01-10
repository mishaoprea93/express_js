var express = require('express');
var session = require('express-session');
var path = require("path");
var app = express();
var port = 8000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({ secret: "keylog" }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    if (req.session.counter) {
        req.session.counter++;
        res.render("index", { val: req.session.counter });
    } else {
        req.session.counter = 1;
        res.render("index", { val: req.session.counter });
    }
});
app.get('/counter', function(req, res) {
    req.session.counter++;
    res.redirect("/");
})
app.get('/reset', function(req, res) {
    req.session.counter = 0;
    res.redirect("/");
})
app.listen(port, function() {
    console.log("listening on port 8000");
})