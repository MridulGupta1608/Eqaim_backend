const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  image: String,
  name: String,
  username: String,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
