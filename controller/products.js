// const fs = require("fs");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;
const prodModel = require("../models/productModel");
const Counter = require("../models/counterSchema");
const Product = prodModel.Product;

// POST
exports.createProduct = async (req, res) => {
  const product = req.body; // Expecting a single product object

  try {
    // Fetch the current counter value
    let counter = await Counter.findOne({ name: "productCounter" });

    // If counter doesn't exist, create it
    if (!counter) {
      counter = new Counter({ name: "productCounter", value: 0 });
    }

    // Ensure the product doesn't already have an id from req.body
    if (!product.id) {
      let uniqueIdFound = false;
      while (!uniqueIdFound) {
        counter.value += 1;
        for (i = 1; i <= counter.value; i++) {
          // Check if the generated ID already exists in the database
          const existingProduct = await Product.findOne({ id: i });
          if (!existingProduct) {
            product.id = i;
            uniqueIdFound = true;
          }
          if(uniqueIdFound) break;
        }
      }
    }

    // Save the updated counter value
    await counter.save();

    // Save the product to the database
    const savedProduct = await Product.create(product);
    res.status(200).json({ message: "Product saved", product: savedProduct });
  } catch (err) {
    let counter = await Counter.findOne({ name: "productCounter" });
    counter.value -= 1;
    await counter.save();
    console.log(err);
    res.status(404).json({ error: "Invalid data", data: err });
  }
};

//GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(402).json({ error: "data not found" });
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
  const prevProd = await Product.find({ id: id });
  const product = await Product.findOneAndReplace({ id: id }, req.body, {
    new: true,
  });
  res.status(201).json({
    message: "Data replaced",
    updated_data: product,
    previous_data: prevProd,
  });
};

//PATCH
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    res.status(203).json({ message: "data updated", data: product });
  } catch (e) {
    res.status(400).json({ error: "Internal server error" });
  }
};

//DELETE
exports.deleteProducts = async (req, res) => {
  const id = req.params.id;

  try {
    // Find and delete the product by id
    const product = await Product.findOneAndDelete({ id: id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the counter if a product was deleted
    const counter = await Counter.findOne({ name: "productCounter" });

    if (counter && counter.value > 0) {
      counter.value -= 1; // Decrement the counter value
      await counter.save(); // Save the updated counter to the database
    }

    res.status(200).json({ message: "Product deleted", product: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
