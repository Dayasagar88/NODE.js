// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;
const prodModel = require("../models/productModel");
const Product = prodModel.Product;

// POST
exports.createProducts = async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(200).json({ message: "data saved", product: product });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid data", data: err });
  }
};

//GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ error: "data not found" });
  }
};

//GET /products/:Id
exports.getProdById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.find({ id: id });
    if (product.length === 0)
      return res.status(404).json({ error: "Product not found" });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
};

//PUT /products/:Id
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const prevProd = await Product.find({id : id})
  const product = await Product.findOneAndReplace({id : id}, req.body, {new : true})
  res.status(201).json({ message: "Data replaced" , updated_data : product, previous_data : prevProd});
};

//PATCH 
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOneAndUpdate({id : id}, req.body ,{new : true});
    res.status(203).json({message :"data updated", data : product})
  }catch(e){
    res.status(400).json({error : "Internal server error"});
  }
};

//DELETE
exports.deleteProducts = async (req, res) => {
  const id = req.params.id;
  try{
    const product = await Product.findOneAndDelete({id : id});
    res.status(206).json({ message: "Product deleted" , product : product});
  }catch(err){
    res.status(400).json({error : "Internal server error"})
  }
};
