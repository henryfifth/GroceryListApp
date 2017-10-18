var mongoose = require("mongoose");
var HouseSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  zipCode: String,
  password: String,
  users: []
});
module.exports = mongoose.model('House', HouseSchema);