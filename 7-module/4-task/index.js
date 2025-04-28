import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">${value}</span>
        </div>

        <div class="slider__progress" style="width: 0%"></div>

        <div class="slider__steps">
        </div>
      </div>
    `);
    for(let i=0; i < steps; i++){
      const sliderStep = createElement(`
        <span></span>
        `);
      if(i === value) sliderStep.classList.add('slider__step-active');
      this.elem.querySelector('.slider__steps').append(sliderStep);
    }

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    this.elem.addEventListener('click', (e) => {
      this.onClick(e);
    });

    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();

      this.elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', this.onMove);
      document.addEventListener('pointerup', this.onUp);
    });
  }

  onClick(e) {
    const sliderRect = this.elem.getBoundingClientRect();
    const stepWidth = sliderRect.width / (this.steps - 1);
    const sliderClick = Math.round((e.clientX - sliderRect.left) / stepWidth);

    this.updateSlider(sliderClick);
  }

  updateSlider(value) {
    const percent = (value / (this.steps - 1)) * 100;
    this.elem.querySelector('.slider__value').textContent = value;
    this.elem.querySelector('.slider__thumb').style.left = `${percent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percent}%`;
    this.value = value;

    this.elem.querySelectorAll('.slider__steps span').forEach((span) => {
      span.classList.remove('slider__step-active');
    });

    const activeSpan = this.elem.querySelectorAll('.slider__steps span')[this.value];
    if (activeSpan) activeSpan.classList.add('slider__step-active');

    const event = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }


  onMove = (e) => {
    e.preventDefault(); // 

    const sliderRect = this.elem.getBoundingClientRect();
    let left = e.clientX - sliderRect.left;
    let leftRelative = left / this.elem.offsetWidth;

    // Ограничиваем значение в пределах [0, 1]
    if (leftRelative < 0) leftRelative = 0;
    if (leftRelative > 1) leftRelative = 1;

    const leftPercents = leftRelative * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);

    this.elem.querySelector('.slider__value').textContent = value;

    this.elem.querySelectorAll('.slider__steps span').forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === value);
    });
  };

  onUp = () => {
    document.removeEventListener('pointermove', this.onMove);
    document.removeEventListener('pointerup', this.onUp);

    this.elem.classList.remove('slider_dragging'); // Убираем класс для стилей

    // Фиксируем значение после окончания перетаскивания
    const value = +this.elem.querySelector('.slider__value').textContent;
    this.updateSlider(value);
  };
}