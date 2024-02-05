const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema({
    userId: {type: String},
    fname: {type: String},
    lname: {type: String},
    username: { type: String},
    password: { type: String },
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    dob: {type: String},
});

customerSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Enter",enteredPassword,"This",this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
