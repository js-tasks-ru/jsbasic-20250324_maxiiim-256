import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem;

    if (this.isEmpty()) {
      product.count = 1;
      this.cartItems.push(product);
      cartItem = product;
    } else {
      const alreadyExist = this.cartItems.find(item => item.id === product.id);

      if (alreadyExist) {
        alreadyExist.count += 1;
        cartItem = alreadyExist;
      } else {
        product.count = 1;
        this.cartItems.push(product);
        cartItem = product;
      }
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
      this.cartItems[index].count += amount;

      if (this.cartItems[index].count <= 0) this.cartItems.splice(index, 1);

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
    return this.cartItems.reduce((total, item) => total + item.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
          </div>
        </div>
      </div>
    `);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>
    `);
  }

  renderModal() {
    const modal = new Modal();
    this.modal = modal;
    document.body.append(modal.elem);

    modal.setTitle('Your order');

    const modalBody = createElement('<div></div>');
    modal.setBody(modalBody);

    for (const product of this.cartItems) {
      const prodElem = this.renderProduct(product, product.count);
      modalBody.append(prodElem);
    }

    const orderForm = this.renderOrderForm();
    modalBody.append(orderForm);

    modalBody.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      const prodCont = button.closest('.cart-product');
      if (!prodCont) return;

      const prodId = prodCont.dataset.productId;
      const counter = prodCont.querySelector('.cart-counter__count');
      const priceElem = prodCont.querySelector('.cart-product__price');

      const productInCart = this.cartItems.find(item => item.id === prodId);
      const basePrice = productInCart.price;

      const currentCount = parseInt(counter.innerText);

      let newCount;
      if (button.classList.contains('cart-counter__button_plus')) {
        newCount = currentCount + 1;
      } else if (button.classList.contains('cart-counter__button_minus')) {
        newCount = currentCount - 1;
      }

      if (newCount > 0) {
        counter.innerText = newCount;
        const newPrice = (basePrice * newCount).toFixed(2);
        priceElem.innerText = `€${newPrice}`;
        this.updateProductCount(prodId, newCount - currentCount);
      } else {
        prodCont.remove();
        this.updateProductCount(prodId, -currentCount);
        if (this.isEmpty()) modal.close();
      }
      const totalPriceElement = modalBody.querySelector('.cart-buttons__info-price');
  if (totalPriceElement) {
    totalPriceElement.innerText = `€${this.getTotalPrice().toFixed(2)}`;
  }
    });
    const form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit(e); 
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return;

    const modalBody = document.querySelector('.modal__body').firstChild;
    const productId = cartItem.id;

    const productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    const productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    const infoPrice = modalBody.querySelector('.cart-buttons__info-price');

    if (cartItem.count > 0) {
      productCount.innerText = cartItem.count;

      productPrice.innerText = `€${(cartItem.price * cartItem.count).toFixed(2)}`;
    } else {
      modalBody.querySelector(`[data-product-id="${productId}"]`)?.remove();
    }

    infoPrice.innerText = `€${this.getTotalPrice().toFixed(2)}`;

    if (this.isEmpty()) {
      const modal = document.querySelector('.modal.is-open');
      if (modal) modal.close();
    }
  }

  onSubmit(event) {
    event.preventDefault();
  
    const form = event.target; 
    const submitButton = form.querySelector('button[type="submit"]');
  
    submitButton.classList.add('is-loading');
  
    const formData = new FormData(form);
  
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        this.modal.setTitle('Success!')
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modal.setBody(createElement(`<div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
          `));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      })
      .finally(() => {
        submitButton.classList.remove('is-loading');
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}