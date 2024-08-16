const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  pincode: { type: String, required: true },
  street: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
});

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique : true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    max: [60, "age limit exeeded"],
    min: [18, "min age = 18"],
  },
  email: {
    type: String,
    required: true,
  },
  address: addressSchema,
});

exports.User = mongoose.model("User", userSchema);
