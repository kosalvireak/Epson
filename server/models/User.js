const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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


UserScheme.pre('save', async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    throw error;
  }
})

UserScheme.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = mongoose.model("user", UserScheme);
