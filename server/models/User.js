const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "Please different username"],
      reuired: true,
    },
    name: String,
    lastname: String,
    public: {
      type: Boolean,
      default: false,
    },
    profilePhoto: {
      type: String,
      default: "default.jpg",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

let UserModel = model("user", UserSchema);

module.exports = UserModel;
