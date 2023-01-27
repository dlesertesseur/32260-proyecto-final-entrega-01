class Cart {
  id;
  products;

  constructor() {
    this.products = [];
  }

  addProduct(pid) {
    let ret = 0;
    const productIndex = this.products.findIndex((p) => p.product === pid);
    if (productIndex >= 0) {
      this.products[productIndex].quantity = this.products[productIndex].quantity + 1;
      ret = this.products[productIndex].quantity;
    } else {
      this.products.push({ product: pid, quantity: 1 });
      ret = 1;
    }
    return ret;
  }
}

module.exports = { Cart };
