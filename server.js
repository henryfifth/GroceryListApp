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
app.use(expressSession({ secret: "mark rules" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

passport.use(new LocalStrategy({ username: "email", password: "password" }, function (email, password, done) {
  User.findOne({
    email: email
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      return done(err, null)
    } else if (foundUser) {
      if (passwordHash.verify(password, foundUser.password)) {
        return done(null, foundUser);
      } else {
        return done("password and username don't match", null);
      }
    } else {
      return done()
    }
  })
})
)

passport.serializeUser(function (user, done) {
  done(null, user._id);
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
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

app.get('/houses', function (req, res, next) {
  if (req.user) {
    House.findById(req.user.house, (err, item) => {
      if (err) {
        console.log(err);
        next(err);
      }
    }).populate('items').exec((err, items) => {
      if (items == null) {
        console.log('oh well!')
      } else {
        res.json(items.items)
      }
    })
  }
});

app.put('/selector', (req, res, next) => {
  House.findByIdAndUpdate({ _id: req.user.house }, "items", (err, house) => {
    house.items.forEach(function (e, i) {
      if (e._id == req.body._id) {
        e.selector = req.body.selector
        e.color = req.user.color
      }
    });
    house.save((err, itemReturned) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        House.findById({ _id: req.user.house }, (err, house) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.json(house.items);
          }
        });
      }
    });
  })
})

app.put('/houses/', (req, res, next) => {
  House.findByIdAndUpdate({ _id: req.user.house }, "items", (err, house) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      house.items.push({ name: req.body.name, quantity: req.body.quantity, selector: false })
      house.save((err, itemReturned) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
          House.findById({ _id: req.user.house }, (err, house) => {
            if (err) {
              console.log(err);
              next(err);
            } else {
              res.json(house.items);
            }
          });
        }
      });
    };
  })
});

app.put('/delete', (req, res, next) => {
  House.findByIdAndUpdate({ _id: req.user.house }, "items", (err, house) => {
    var num = null;
    house.items.forEach(function (e, i) {
      if (e._id == req.body._id) {
        num = house.items.indexOf(e);
      }
    });
    house.items.splice(num, 1);
    house.save((err, itemReturned) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        House.findById({ _id: req.user.house }, (err, house) => {
          if (err) {
            console.log(err);
            next(err);
          } else {
            res.json(house.items);
          }
        });
      }
    });
  })
})


app.post("/signup", (req, res, next) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.color = req.body.color;
  user.house = null;
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
        console.log('VVVV error')
        if (error) {
          console.log(error);
          res.json({
            message: 'An account is already associated with that email address.'
          })
        } else {
          res.json({
            userReturned: userReturned,
            found: true,
            message: "Account created.",
            success: true
          })
        }
      })
    }
  })
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      res.json({ found: false, success: false, err: true, message: err });
    } else if (user) {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          res.json({ found: true, success: false, message: err })
        } else {
          res.json({ found: true, success: true, firstName: user.firstName, lastName: user.lastName })
        }
      })
    } else {
      res.json({ found: false, success: false, message: "password and username don't match" })
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
            message: "Congratulations! House List Created Successfully",
            success: true
          });
        }
      });
    }
  });
});

app.get('/user', (req, res, next) => {
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err)
    }
  }).populate('house').exec((err, user) => {
    console.log(user);
    res.json(user)
  });
});

app.put('/join', (req, res, next) => {
  console.log(req.body)
  House.findOne({ "houseName": req.body.joinHouse }, "password users", (err, house) => {
    console.log(err)
    console.log('HIYEE!!')
    console.log(house)
    if (err) {
      console.log(null);
      next(err);
    } else if (!house) {
      res.json({ message: "House Does Not Match" });
    }
    else if (house) {
      User.findById(req.user._id, (er, foundUser) => {
        if (err) {
          console.log(err)
          res.json({ message: "user not found" })
        } else {

        foundUser.house = house._id
        foundUser.save((err, userReturned) =>{
          if(err){
            next(err)
          } else {
            res.json(userReturned)
          }
        })
  }})
  }})  
})



var port = 5000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});
