function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const txt = document.querySelector('#text');
  button.addEventListener('click', () => {
    txt.toggleAttribute('hidden');
  })
}
