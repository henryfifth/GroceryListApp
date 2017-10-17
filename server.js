let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var fetch = require('node-fetch');

app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var Item = require('./models/items.js');

var mongodbUri = 'mongodb://localhost/items';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Item database connected.');
});


app.post('/items', function (req, res, next) {
  var item = new Item();
  item.name = req.body.name
  item.quantity = req.body.quantity;
  item.save(function (err, itemReturned) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      Item.find(function (err, item) {
        if (err) {
          console.log(err);
          next(err);
        } else {
          res.json(item);
        }
      });
      //res.json(itemReturned._id);
    }
  });
});

app.get('/items', function (req, res, next) {
  Item.find(function (err, item) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.json(item);
    }
  });
})

app.delete('/items', function (req, res, next) {
  Item.find(function (err, item){
    if (err) {
      console.log(err);
    }
  })
})

app.listen(5000, () => {
  console.log('listening on port 5000 ');
});


