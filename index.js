require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); //bodyParser(express built in)
const productRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRoutes");
const mongoose = require("mongoose");

//DB connection code
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

  console.log("DB connected");
}


app.use("/products", productRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running port", process.env.PORT);
});
