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
    };

    this.elem.addEventListener('click', (e) => {
      const sliderRect = this.elem.getBoundingClientRect();

      const clickPos = document.elementFromPoint(e.clientX, e.clientY); 
      const allSpan = clickPos.querySelectorAll('.slider__steps span'); 
      const stepWidth = sliderRect.width / (steps - 1);
      const sliderClick = Math.round((e.clientX - sliderRect.left) / stepWidth);

      this.elem.querySelector('.slider__value').textContent = sliderClick;
      const percent = sliderClick / (this.steps -1)*100;
      this.elem.querySelector('.slider__thumb').style.left = `${percent}%`;
      this.elem.querySelector('.slider__progress').style.width = `${percent}%`;

      this.value = sliderClick;

      allSpan.forEach((span) => span.classList.remove('slider__step-active'));
      const activeSpan = this.elem.querySelectorAll('.slider__steps span')[this.value];
      if(activeSpan) activeSpan.classList.add('slider__step-active');

      const event = new CustomEvent ('slider-change', {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    });

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();

      document.body.style.userSelect = 'none';
      this.onMoveBind = this.onMove.bind(this);
      this.onUpBind = this.onUp.bind(this);
      document.addEventListener('pointermove',this.onMoveBind);
      document.addEventListener('pointerup',this.onUpBind);
    });
  } 

  onMove(e) {
    const sliderRect = this.elem.getBoundingClientRect();
    const stepWidth = sliderRect.width / (this.steps - 1);

    let sliderClick = Math.round((e.clientX - sliderRect.left) / stepWidth);
    sliderClick = Math.min(Math.max(sliderClick, 0), this.steps - 1); // Ограничение границ
    const percent = (sliderClick / (this.steps - 1)) * 100;

    this.elem.querySelector('.slider__value').textContent = sliderClick;
    this.elem.querySelector('.slider__thumb').style.left = `${percent}%`;
    this.elem.querySelector('.slider__progress').style.width = `${percent}%`;

    this.value = sliderClick;
    this.elem.querySelector('.slider__thumb').classList.add('slider_dragging');

    this.elem.querySelectorAll('.slider__steps span').forEach((span) => {
      span.classList.remove('slider__step-active');
    });
    const activeSpan = this.elem.querySelectorAll('.slider__steps span')[this.value];
    if (activeSpan) activeSpan.classList.add('slider__step-active');

    const event = new CustomEvent ('slider-change',{
      detail: this.value,
      bubbles: true
    })
    this.elem.dispatchEvent(event);
  }
  onUp() {
    document.body.style.userSelect = '';
    this.elem.querySelector('.slider__thumb').classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.onMoveBind);
    document.removeEventListener('pointerup', this.onUpBind);
  }
}