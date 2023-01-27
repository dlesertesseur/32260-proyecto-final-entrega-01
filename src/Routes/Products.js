const { Router } = require("express");
const { ProductManager } = require("../DataAccess/ProductManager");
const { Product } = require("../models/Product");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const pm = new ProductManager("./data/productos.json");
  let products = await pm.getProducts();

  if (limit) {
    products.splice(limit);
  }

  res.send(products);
});

productRouter.get("/:pid", async (req, res) => {
  const param = req.params.pid;
  const pid = parseInt(param);

  const pm = new ProductManager("./data/productos.json");
  let product = await pm.getProductById(pid);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: `Product id: ${pid} Not Found` });
  }
});

productRouter.post("/", async (req, res) => {
  const pm = new ProductManager("./data/productos.json");
  const body = req.body;
  let product = new Product(
    body.title,
    body.description,
    body.code,
    body.price,
    body.stock,
    body.status,
    body.category,
    body.thumbnail
  );

  const ret = await pm.addProduct(product);

  if (!ret.message) {
    res.send(JSON.stringify(ret.product));
  } else {
    res.status(ret.code).send({ message: ret.message });
  }
});

productRouter.put("/:pid", async (req, res) => {
  const param = req.params.pid;
  const pid = parseInt(param);

  const pm = new ProductManager("./data/productos.json");
  const body = req.body;
  let product = new Product(
    body.title,
    body.description,
    body.code,
    body.price,
    body.stock,
    body.status,
    body.category,
    body.thumbnail
  );

  const ret = await pm.updateProduct(pid, product);

  if (!ret.message) {
    res.send(JSON.stringify(ret.product));
  } else {
    res.status(ret.code).send({ message: ret.message });
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const param = req.params.pid;
  const pid = parseInt(param);

  const pm = new ProductManager("./data/productos.json");

  let product = await pm.getProductById(pid);
  if (product) {
    const ret = await pm.deleteProduct(pid);
    res.status(ret.code).send({ message: ret.message });
  } else {
    res.status(404).send({ message: `Product id: ${pid} Not Found` });
  }
});

module.exports = productRouter;
