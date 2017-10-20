var passwordHash = require("password-hash");
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: {type: String, set: function(password){
    return passwordHash.generate(password)
  }},
  house: String
});
module.exports = mongoose.model('User', UserSchema);