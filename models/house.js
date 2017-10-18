var mongoose = require("mongoose");
var HouseSchema = new mongoose.Schema({
  houseName: { type: String, required: true, unique: true },
  password: String,
  roommates: String,
  users: []
});
module.exports = mongoose.model('House', HouseSchema);