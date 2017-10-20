let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var fetch = require('node-fetch');
var User = require("./models/users");
var House = require("./models/house");
var expressSession = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passwordHash = require("password-hash");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var Item = require('./models/items.js');
var cookieParser = require('cookie-parser');

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

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({secret: "mark rules"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

passport.use(new LocalStrategy({username:"email", password:"password"}, function(email, password, done){
  User.findOne({
    email: email
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return done(err, null)
    } else {
      if(passwordHash.verify(password, foundUser.password)){
        return done(null, foundUser);
      } else {
        return done("password and username don't match", null);
      }
    }
  })
})
)

passport.serializeUser(function(user, done){
  done(null, user._id);
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) {
    } else {
      done(null, user);
    }
  })
})


app.post('/items', function (req, res, next) {
  var item = new Item();
  item.name = req.body.name
  item.quantity = req.body.quantity;
  item.selector = false;
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
  if (req.user) {
  Item.find(function (err, item) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.json(item);
    }
})} else {
  res.json({found: true, success: false, message: "You are not authenticated."})
  }
})

app.put('/items/:id', (req, res, next) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, "selector", (err, item) => {
    if (err) {
      console.log(err);
      next(err);
    } else {

      item.selector = req.body.selector;
      item.save((err, itemReturned) => {
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
    };
  })
});


app.delete('/items/:id', function (req, res, next) {
  Item.remove({ _id: req.params.id }, function (err, item) {
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
  }, (err, foundUser) => {
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
          })
        }
      })
    }
  })
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function(err, user){
    if(err){
      res.json({found: false, success: false, err: true, message: err});
    } else if(user){
      req.logIn(user, (e)=>{
        if (e) {
          res.json({found: true, success: false, message: e})
        } else {
          res.json({found: true, success: true, firstName: user.firstName, lastName: user.lastName})
        }
      })
    } else {
      res.json({found: false, success: false, message: "password and username don't match"})
    }
  })(req, res, next);
  var email = req.body.email;
  var password = req.body.password;
});

app.post("/create-house", (req, res, next) => {
  var house = new House();
  house.houseName = req.body.houseName;
  house.password = req.body.password;
  User.findOne({
    houseName: house.houseName
  }, (err, foundHouse) => {
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

app.put('/join', (req, res, next) => {
  House.findOne({ "houseName": req.body.joinHouse }, "password users", (err, house) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if (req.body.password === house.password) {
        house.users.push(req.body.user);
        house.save((err, userReturned) => {
          if (err) {
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
  })
});



var port = 5000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});


