const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

//POST
exports.createProducts = (req, res) => {
    products.push(req.body);
    res.status(201).json(req.body) 
  }
  //GET
  exports.getAllProducts = (req, res) => {
    res.status(200).json(products)
  }
  //GET
  exports.getProdById = (req, res) => {
    const id = +req.params.id;
    res.status(200).json(products[id - 1])
  }
  //PUT
  exports.replaceProduct = (req , res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1 , {id: id, ...req.body});
    res.status(202).json({message : "Data updated"})
  }
  //PATCH
  exports.updateProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    const product = products[productIndex];
    products.splice(productIndex, 1, {...product, ...req.body});
    res.status(200).json({message : "Data upadted (PATCH)"})
  } 
  //DELETE
  exports.deleteProducts = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex(p => p.id === id);
    products.splice(productIndex, 1);
    res.status(200).json({message : "Product deleted"})
  }