const { Router } = require("express");
const { CartManager } = require("../DataAccess/CartManager");
const { Cart } = require("../models/Cart");
const cartRouter = Router();

const fileName = "./data/carrito.json";

cartRouter.post("/", async (req, res) => {
  const pm = new CartManager(fileName);
  let cart = new Cart();

  const ret = await pm.addCart(cart);
  if (!ret.error) {
    res.send(JSON.stringify(ret.cart));
  } else {
    res.status(ret.code).send(JSON.stringify(ret.error));
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const param = req.params.cid;
  const cid = parseInt(param);

  const pm = new CartManager(fileName);
  let cart = await pm.getCartById(cid);

  if (cart) {
    res.send(cart.products);
  } else {
    res.status(404).send({ message: `Cart id: ${cid} Not Found`});
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let ret = null;
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);

  if (cid && pid) {
    const pm = new CartManager(fileName);
    const cart = await pm.getCartById(cid);

    if (cart) {

      const quantity = cart.addProduct(pid);

      ret = await pm.saveCart(cart);
      if (ret.error) {
        res.status(ret.type).send(ret.error);
      } else {
        res.send({message:`ProductId: ${pid} added to Cart id: ${cid} quantity: ${quantity}`});
      }
    } else {
      res.status(404).send({message:`Cart id: ${cid} Not Found`});
    }
  } else {
    res.status(400).send({message:"Bad request"});
  }
});

module.exports = cartRouter;
