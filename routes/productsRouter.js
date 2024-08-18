const prodContainer = require("../controller/products");
const express = require("express");
const router = express.Router();


router
  .post("", prodContainer.createProduct)
  .get("", prodContainer.getAllProducts)
  .get("/:id", prodContainer.getProdById)
  .put("/:id", prodContainer.replaceProduct)
  .patch("/:id", prodContainer.updateProduct)
  .delete("/:id", prodContainer.deleteProducts);

module.exports = router;  