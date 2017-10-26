var passwordHash = require("password-hash");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  color: String,
  email: { type: String, required: true, unique: true },
  password: {type: String, set: function(password){
    return passwordHash.generate(password)
  }},
  house: {type: Schema.Types.ObjectId, ref: 'House'}
});
module.exports = mongoose.model('User', UserSchema);