let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8888;
let list = require('./controllers/routes/list');
let item = require('./controllers/routes/item')
let config = require('config');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Content-length, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

//db options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }

};

//db connection

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  // use morgan to log at command line 
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/', (req, res) => res.json({message: "Welcome to Lists"}));


app.route('/list/:listId')
.get(list.getList)
.delete(list.deleteList)
.post(list.updateList);

app.route('/list')
.get(list.getLists)
.post(list.postList);

app.route('/list/:listId/item')
  .post(item.postItemToList);

app.route('/item/:itemId')
  .post(item.updateItemById);

  

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;



