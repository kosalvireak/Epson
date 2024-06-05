const mongoose = require("mongoose");

const UserScheme = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/dahrstekd/image/upload/v1697536726/samples/blank_profile.jpg"
  }
});

module.exports = mongoose.model("user", UserScheme);
