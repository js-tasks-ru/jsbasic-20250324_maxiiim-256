import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);
    const inner = this.elem.querySelector('.carousel__inner');
    for (const slide of slides) {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      inner.appendChild(slideElement);
    }
    
    const leftArrow = this.elem.querySelector(".carousel__arrow_left")
    const rightArrow = this.elem.querySelector(".carousel__arrow_right")
    let index = 0;

    leftArrow.style.display = 'none';
    this.elem.addEventListener('click', () => {
    if(index === 0){
      leftArrow.style.display = 'none';
    }
    else if (index === inner.children.length - 1){
      rightArrow.style.display = 'none';
    }
    else{
      leftArrow.style.display = '';
      rightArrow.style.display = '';
    }
  })

    leftArrow.addEventListener('click', () =>{
      index -= 1;
      inner.style.transform = `translateX(${index * -inner.offsetWidth}px)`;
    });
    rightArrow.addEventListener('click', () =>{
      index += 1;
      inner.style.transform = `translateX(${index * -inner.offsetWidth}px)`;
    });

this.elem.addEventListener('click', (event) => {
  const button = event.target.closest('.carousel__button');
  if (button) {
    const slide = button.closest('.carousel__slide');
    const slideId = slide.dataset.id;

    const event = new CustomEvent("product-add", {
      detail: slideId, 
      bubbles: true 
    });
    this.elem.dispatchEvent(event);
  }
});
}
  
}
