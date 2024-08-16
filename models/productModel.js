const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema
const productSchema = new Schema({
    id: {type : Number, unique : true},
    title: {type : String , required : true},
    price: {type :Number, required : true , min:[0 , "Invalid price"]},
    quantity: {type : Number , required : true},
    total: {type : Number, required : true, min:[0, "Invalid total(min)"], max:[1000, "Invalid total(max)"]},
    discountPercentage: {type : Number, required : true, min:[0, "Invalid discount(min)"], max:[50, "Invalid discount(max)"]},
    discountedTotal: {type : Number , required : true},
    thumbnail: {type : String , required : true},
  });
  
 exports.Product = mongoose.model("Product", productSchema); 