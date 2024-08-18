const mongoose = require("mongoose");
const {Schema} = mongoose;

//Schema
const productSchema = new Schema({
    id: {type : Number, unique : true},
    title: {type : String , required : true},
    price: {type :Number, required : true , min:[0 , "Invalid price"]},
    quantity: {type : Number , required : true , default:1},
    total: {type : Number, required : true, min:[0, "Invalid total(min)"], max:[100000, "Invalid total(max)"], default:0},
    discountPercentage: {type : Number, min:[0, "Invalid discount(min)"], max:[50, "Invalid discount(max)"], default: 10},
    discountedTotal: {type : Number },
    thumbnail: {type : String , required : true, unique: true},
  }); 
  
 exports.Product = mongoose.model("Product", productSchema); 