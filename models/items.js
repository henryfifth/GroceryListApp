var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema ({
  name: String,
  quantity: Number,
  selector: Boolean
});

module.exports = mongoose.model("Item", ItemSchema);