var mongoose = require("mongoose");
var HouseSchema = new mongoose.Schema({
  houseName: { type: String, required: true, unique: true },
  password: String,
  roommates: String,
  items: [{name: String, quantity: Number, selector: Boolean, color: String}],
  housemate: [{firstName: {type: String, unique: true}, color: String}]
});
module.exports = mongoose.model('House', HouseSchema);