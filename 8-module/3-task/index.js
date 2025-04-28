export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if(!product) return;

    let cartItem;

    if(this.isEmpty()){
      product.count = 1;
      this.cartItems.push(product);
      cartItem = product;
    }
    else{
      const alreadyExist = this.cartItems.find(item => item.id === product.id);

      if(alreadyExist){ 
        alreadyExist.count += 1;
        cartItem = alreadyExist;
      }
      else{
        product.count = 1;
        this.cartItems.push(product);
        cartItem = product;
      }
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(item => item.id === productId);

    if(index !== -1){
      this.cartItems[index].count += amount;

      if(this.cartItems[index].count <= 0) this.cartItems.splice(index, 1);

      this.onProductUpdate(this.cartItems[index]);
    }
  }

  isEmpty() {
    return !Boolean(this.cartItems.length);
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    let result = 0;
    for(const {price, count} of this.cartItems){
      result += price * count;
    }
    return result;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

