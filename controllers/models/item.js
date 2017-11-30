let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let ItemSchema = new Schema(
  {
    item: { type: String, required: true },
    score: { type: Number, default: 0},
    belongs_to: { type: Schema.Types.ObjectId, required: true},
    created_at: {type: Number}

  }
);

module.exports = mongoose.model('item', ItemSchema);