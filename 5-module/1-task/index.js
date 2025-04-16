function hideSelf() {
    const button = document.querySelector('.hide-self-button');

    button.addEventListener('click', () => {
      button.setAttribute('hidden',true); 
      button.hidden = true;
    });
}