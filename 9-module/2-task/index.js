import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.products = []; 
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    try {
      const response = await fetch('products.json');
      this.products = await response.json(); 
    } catch (error) {
      console.error('error:', error);
      return; 
    }

    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = ''; 

    this.productsGrid = new ProductsGrid(this.products);
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.querySelector('#nuts-checkbox').checked,
      vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail; 
      const product = this.products.find(p => p.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    document.body.addEventListener('slider-change', (event) => {
      const maxSpiciness = event.detail;
      this.productsGrid.updateFilter({ maxSpiciness });
    });

    document.body.addEventListener('ribbon-select', (event) => {
      const category = event.detail;
      this.productsGrid.updateFilter({ category });
    });

    document.querySelector('#nuts-checkbox').addEventListener('change', (event) => {
      const noNuts = event.target.checked;
      this.productsGrid.updateFilter({ noNuts });
    });

    document.querySelector('#vegeterian-checkbox').addEventListener('change', (event) => {
      const vegeterianOnly = event.target.checked;
      this.productsGrid.updateFilter({ vegeterianOnly });
    });
  }
}