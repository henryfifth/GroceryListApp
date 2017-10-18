let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var fetch = require('node-fetch');
var User = require("./models/users");
var House = require("./models/house");

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
  item.selector = req.body.selector;
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
      console.log(item);
    }
  });
})

app.put('/items/:id', (req, res, next)=>{
  Item.findByIdAndUpdate({_id: req.params.id}, "selector", (err, item)=>{
    if(err) {
      console.log(err);
      next(err);
    } else {
        item.selector = req.body.selector;
        item.save((err, itemReturned)=>{
          if(err){
            console.log(err);
            next(err);
          } else {
            res.json('item updated in db' + itemReturned);
          }
      });
  };
})});


app.delete('/items/:id', function (req, res, next) {
  Item.remove({_id: req.params.id}, function (err, item){
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
    }  
  })
})

app.post("/signup", (req, res, next) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password; 
  User.findOne({
    email: user.email
  },  (err, foundUser)=> { 
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      user.save((error, userReturned) => {
        if (error) {
          console.log(error);
          next(error);
        } else {
          res.json({
            userReturned: userReturned,
            found: true,
            message: "Success",
            success: true
          })}})}})});

app.post('/login', function (req, res, next) { 
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      if (user) {
        if (password === user.password) {
          res.json({
            found: true,
            message: "Welcome " + user.firstName,
            success: true
          });
        } else {
          res.json({
            found: true,
            message: "Incorrect Password",
            success: false
          });
        }
      } else {
        res.json({
          found: false,
          message: "User doesn't exist in database",
          success: false
        });
      }
    }
  });
});

app.post("/create-house", (req, res, next) => {
  var house = new House();
  house.houseName = req.body.houseName;
  house.password = req.body.password;
  User.findOne({
    houseName: house.houseName
  },  (err, foundHouse)=> { 
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      house.save((error, houseReturned) => {
        if (error) {
          console.log(error);
          next(error);
        } else {
          res.json({
            houseReturned: houseReturned,
            found: true,
            message: "List Created Successfully",
            success: true
          });
        }
      });
    }
  });
});

app.put('/join', (req, res, next)=>{
  House.findOne({"houseName": req.body.joinHouse}, "password users", (err, house)=>{
    if(err) {
      console.log(err);
      next(err);
    } else {
      if (req.body.password === house.password) {
        house.users.push(req.body.user);
        house.save((err, userReturned)=>{
          if(err){
            console.log(err);
            next(err);
          } else {
            res.json('user updated in db' + userReturned.users);
          }
      });
    } else {
      res.json('No password match found in database')
    }
  };
})});



var port = 5000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});


