const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const morgan = require("morgan")
const express = require("express");
const app = express();
app.use(express.json()); //bodyParser(express built in)
// app.use(morgan("dev"))
app.use(express.static("public"));


const products = data.carts[0].products;


//API - Endpoints - Routes
//Create POST /products        C R U D
app.post("/products", (req, res) => {
  const data = req.body;
  products.push(data);
  res.send({ type: "POST" , message : "Data sent", data : data});
});



//API root , base URL
//Read GET /products 
app.get("/products", (req, res) => {
  res.json({products : products , type : "GET"})
  // res.send({ type: "GET" });
});

//Read GET /products/:id
app.get("/products/:id", (req, res) => {
  const id = +(req.params.id) - 1;
  res.status(201).send({products : products[id] , id : id})
})



//Update PUT /products/:id
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(prd => prd.id === id);

  products.splice(productIndex, 1, {id : id, ...req.body})
  res.status(201).send({ type: "PUT" , message : "Updated"});
});



//Update PATCH /products/:id
app.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(prd => prd.id === id);
  const product = products[productIndex]
  products.splice(productIndex, 1, {id : id,...product, ...req.body})
  res.status(201).send({ type: "PATCH" , message : "Updated", products : products[id - 1]});
});

//Delete DELETE /products/:id
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex(prd => prd.id === id);
  const deletedProduct = products.splice(productIndex, 1)
  res.status(201).send({ type: "PATCH" , message : "Deleted"});
});

app.listen(8080, () => {
  console.log("Server is running port 8080");
});
