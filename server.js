const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
var cors = require('cors');
const app = express();
const http = require('http');
const port = 3000;

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', cors(corsOptions), (req, res) => {
    res.render('home');
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log('listening on port: ', port);
});