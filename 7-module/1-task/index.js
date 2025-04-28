import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
      <div class ="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      
        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`);

    const inner = this.elem.querySelector(".ribbon__inner");

// Добавить класс ribbon__item_active для первого элемента

    for(const category of categories){
      const ribbonItem = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `)
      inner.appendChild(ribbonItem);
    }
    
    const leftArrow = this.elem.querySelector(".ribbon__arrow_left");
    const rightArrow = this.elem.querySelector(".ribbon__arrow_right");

    let scrollLeft = null;
    let scrollWidth = null;
    let clientWidth = null;
    let scrollRight = null;
    
    leftArrow.addEventListener('click', () => {
      inner.scrollBy(-350, 0);
    });
    rightArrow.addEventListener('click', () => {
      inner.scrollBy(350, 0);
    });
  
    this.elem.addEventListener('click', () => {
      scrollLeft = inner.scrollLeft;
      scrollWidth = inner.scrollWidth;
      clientWidth = inner.clientWidth;
      scrollRight = scrollWidth - scrollLeft - clientWidth;
      

      if(scrollLeft !== 0){
        leftArrow.classList.add("ribbon__arrow_visible");
      }
      else leftArrow.classList.remove("ribbon__arrow_visible");
      
      if(scrollRight < 1){
        rightArrow.classList.remove("ribbon__arrow_visible");
      }
      else rightArrow.classList.add("ribbon__arrow_visible");
    })

    inner.addEventListener('click' ,(event) => {
      const clck = event.target.closest("a");
      event.preventDefault();
      const allItems = inner.querySelectorAll(".ribbon__item");
      allItems.forEach(item => item.classList.remove("ribbon__item_active"));

      clck.classList.add("ribbon__item_active");

      const e = new CustomEvent('ribbon-select',{
        detail: clck.dataset.id,
        bubbles: true
      });
      inner.dispatchEvent(e);
    });
  }

}