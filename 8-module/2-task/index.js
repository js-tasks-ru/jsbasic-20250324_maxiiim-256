import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
    `);

    const inner = this.elem.querySelector('.products-grid__inner');
    for(const product of products){
      const card = new ProductCard(product);
      inner.append(card.elem);
    }
  }
  updateFilter(filters){
    this.filters = { ...this.filters, ...filters };

    const filteredProducts = this.products.filter((product) => {
      const { noNuts, vegeterianOnly, maxSpiciness, category } = this.filters;

      if (noNuts && product.nuts) {
        return false;
      }

      if (vegeterianOnly && !product.vegeterian) {
        return false;
      }

      if (maxSpiciness !== undefined && product.spiciness > maxSpiciness) {
        return false;
      }

      if (category && category !== product.category) {
        return false;
      }
      return true;
    });

    const inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';

    for (const product of filteredProducts) {
      const card = new ProductCard(product);
      inner.append(card.elem);
    }
    }
}
