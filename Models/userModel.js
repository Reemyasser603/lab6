const mongoose = require('mongoose');
const productSchema = require('./productModel').Schema;
// or const {productSChema}=require('./productModel')
const schemaOptions = {
  strict: false,
  timestamps: true,
};
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
    },
    userType: {
      type: String,
      required: true,
    },
    shoppingCart:[productSchema],
  },
  // schemaOptions
  {
    strict: false,
    timestamps: true,
  }
);


module.exports = mongoose.model('userModel', userschema);
