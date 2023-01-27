const express = require("express");
const productRouter = require("./Routes/Products");
const cartRouter = require("./Routes/Carts");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const server = app.listen(8080, () => {console.log("server listening on port 8080")});

server.on("error", (error) => {
    console.log(error);
  });
  