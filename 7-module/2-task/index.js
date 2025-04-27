import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
      <div class="modal">

        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>

            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div>
        </div>
      </div>`);
    
    const title = this.elem.querySelector(".modal__body");
    this.elem.querySelector(".modal__close").addEventListener('click', () => {
      title.classList.remove("is-modal-open");
      document.body.classList.remove("is-modal-open");
      this.elem.remove();
    });
    this.onkeydown = this.onkeydown.bind(this);
  };
  
  open(){
    document.body.append(this.elem);
    // document.body.querySelector(".modal__body").classList.add("is-modal-open");
    document.body.classList.add("is-modal-open");
    document.addEventListener('keydown', this.onkeydown);
  };
  setTitle(text){
    this.elem.querySelector(".modal__title").textContent = text;
  };
  setBody(node){
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = ''; 
    modalBody.append(node);   
  };
  close(){
    // this.elem.querySelector(".modal__body").classList.remove("is-modal-open")
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener('keydown', this.onkeydown);
  };
  onkeydown(event){
    if(event.code === 'Escape'){
      this.close();
    };
  };
}