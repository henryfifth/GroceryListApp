var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  house: String
});
module.exports = mongoose.model('User', UserSchema);