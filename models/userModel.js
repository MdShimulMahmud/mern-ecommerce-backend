const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Phone Number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be required"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  role: {
    type: String,
    default: "user",
  },
});

// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSaltSync(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

userSchema.methods.isPasswordMatched = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

//Export the model
module.exports = mongoose.model("User", userSchema);
