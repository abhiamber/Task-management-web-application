const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: [true, "Please provide different userName"],
      required: [true, "username is required"],
    },
    firstName: String,
    lastName: String,
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

let UserModel = model("User", UserSchema);

module.exports = UserModel;
