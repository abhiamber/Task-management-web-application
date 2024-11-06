const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  title: {
    type: String,
    maxLength: 30,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
let StoryModel = mongoose.model("Story", StorySchema);
module.exports = StoryModel;
