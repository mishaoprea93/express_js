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
    res.render("index");
});
app.post('/process', function(req, res) {
    if (req.method = "POST") {
        req.session.count += 1;
        req.session.name = req.body.Name;
        req.session.location = req.body.Location;
        req.session.language = req.body.Language;
        req.session.comment = req.body.Comment;

    }
    res.redirect("/result");
});
app.get('/result', function(req, res) {
    res.render("result", { form_data: req.session });
});
app.listen(port, function() {
    console.log("listening on port 8000");
})