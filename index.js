const express = require("express");
const app = express();
app.use(express.json()); //bodyParser(express built in)
const productRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRoutes");

app.use("/products", productRouter);
app.use("/users", usersRouter);


app.listen(8080, () => {
  console.log("Server is running port 8080");
});
