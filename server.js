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
const nodemailer = require('nodemailer');
// var exec = require('./exec.js');

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
app.use(expressSession({ secret: "lee is a fucking beast" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

passport.use(new LocalStrategy({ username: "email", password: "password" },  (email, password, done) => {
  User.findOne({
    email: email
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      next(err);
    } else if (foundUser == null){
      return done('Something went wrong! Please try again', null)
    } else {
      if (passwordHash.verify(password, foundUser.password)) {
        return done(null, foundUser);
      } else {
        return done("password and username don't match", null);
      }
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

//BEGIN CHECK IF EMAIL IS EMAIL
function verifyEmail(email) {
  let emailReplaced = email.replace(/ /g, '');
  let emailSplit = emailReplaced.split(',');
  let arr = [];
  emailSplit.forEach((e, i) => {
    let x = emailSplit.length;
    let atSymbol = emailSplit[i].indexOf("@");
    let dotSymbol = emailSplit[i].lastIndexOf(".");
    if (atSymbol < 1 || dotSymbol < atSymbol + 2 || dotSymbol + 2 >= x.length || atSymbol === -1) {

    } else {
      arr.push(emailSplit[i])
    }
  });
  return arr.toString();
}
//END CHECK IF EMAIL IS EMAIL

//BEGIN MAIL HANDLING
function inviteEmail(email) {
  let beenVerified = verifyEmail(email);
  if (beenVerified != "") {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'idfkbob@gmail.com',
          pass: 'ThisIsAPassword'
        }
      });
      let mailOptions = {
        from: '"Fred Foo 👻" <idfkbob@gmail.com>',
        to: beenVerified,
        subject: 'Hello ✔',
        text: 'Hello world?',
        //EDIT THE HTML TO MAKE THE EMAIL LOOK PRETTY
        html: '<body>' +
        '<style>#bob{font-size: 50%;}</style>' +
        "<p>You have received an invitation to join your friends on our app, Potluck! </p>" +
        "<footer class=bob>If you are Erin or Brian, then you need to change this. It's located in server.js starting at line 112.</footer>" +
        '</body>',
        attachments: [{
          filename: 'nyan cat ✔.gif',
          path: './nyan.gif',
          cid: 'nyan@example.com'
        }]
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            return error;
        }
      });
    });
  }
}


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
    console.log("Got here")
    if (req.user) {
        House.findById(req.user.house, (err, item) => {
            if (err) {
                console.log(err);
                next(err);
            }
        }).populate('items').exec((err, items) => {
            if (items != null) {
                res.json(items.items);
            }
        });
    }else{
        console.log("no req.user")
        res.json("sorry brah! something went wrong")
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
    } else if(req.body.password === ""){
        res.json({
            found: false,
            message: "Bruh! Really? No password???",
            success: false
        });
    }else if(verifyEmail(user.email).length <= 0){
        res.json({
            found: false,
            message: "Sorry mate. You have to put in a real email",
            success: false
        });
    }else if(user.firstName.length <= 0){
        res.json({
            found: false,
            message: "Can I at least get your first name?",
            success: false
        });
    }else if(user.lastName.length <= 0){
        res.json({
            found: false,
            message: "What's your last name?",
            success: false
        });
    }else if(user.color.length <= 0){
        res.json({
            found: false,
            message: "Please pick a color. It is important for later on",
            success: false
        });
    }else{
      user.save((error, userReturned) => {
        if (error) {
            console.log(error);
            res.json({
                found: true,
                message: 'An account is already associated with that email address.',
                success: false
            });
        }else{
          res.json({
            userReturned: userReturned,
            found: true,
            message: "Account created.",
            success: true
          });
        }
      });
    }
  });
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      res.json({ found: false, success: false, err: true, message: err });
    } else if (user) {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
          next(err);
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

app.get('/logout', (req, res) => {
   req.logout();
   req.session.destroy();
   res.redirect('/');
});

app.post("/create-house", (req, res, next) => {
  var house = new House();
  house.houseName = req.body.houseName;
  house.password = req.body.password;
  house.roommates = req.body.roommates;
  inviteEmail(house.roommates);
  User.findOne({
    houseName: house.houseName
  }, (err, foundHouse) => {
    if (err) {
      console.log(err)
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      house.save((err, houseReturned) => {
        if (err) {
          console.log(err);
          next(err);
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
  })
});

app.get('/user', (req, res, next) => {
  User.findById(req.user._id, (err, foundUser) => {
    if (err) {
      console.log(err)
    }
  }).populate('house').exec((err, user) => {
    res.json(user)
  });
});

app.put('/join', (req, res, next) => {
    console.log("GOT HERE");
    console.log(req.body)
    console.log(req.user);
    House.findOne({ "houseName": req.body.joinHouse }, "password users", (err, house) => {
        console.log("AND HERE");
        console.log(house)
        if (err) {
            next(err);
        } else if (!house) {
            console.log("DOWN");
            res.json({ message: "Something went wrong! Please try again." });
        } else if (house.password === req.body.password) {
            console.log("GOT HERE TOO");
            User.findById(req.user._id, (err, foundUser) => {
                console.log("ONCE AGAIN");
                if (err) {
                console.log(err)
                res.json({ message: "User not found" })
                } else {
                    console.log("JUST ONE MORE");
                    foundUser.house = house._id;
                    foundUser.save((err, userReturned) => {
                        if (err) {
                        next(err);
                        } else {
                            console.log("SUCCESS");
                            console.log(userReturned);
                            res.json(userReturned);
                        }
                    });
                }
            });
        }
    });
});

var port = 5000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});
