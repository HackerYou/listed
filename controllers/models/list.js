let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ListSchema = new Schema(
  {
    title: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item'}]
  }
);

module.exports = mongoose.model('list', ListSchema);