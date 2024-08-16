require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json()); //bodyParser(express built in)
const productRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRoutes");

app.use("/products", productRouter);
app.use("/users", usersRouter);

console.log(process.env.DB_PASSWORD)


app.listen(process.env.PORT, () => {
  console.log("Server is running port",process.env.PORT);
});
