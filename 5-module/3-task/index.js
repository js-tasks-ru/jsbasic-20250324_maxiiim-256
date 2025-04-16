function initCarousel() {
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');
  const currentSlide = document.querySelector('.carousel__inner');
  const elem = document.querySelector('.carousel');
  let index = 0;
  const slideWidth = currentSlide.offsetWidth; 


  leftArrow.style.display = 'none';


  elem.addEventListener('click', () => {
    if (index === 0) {
      leftArrow.style.display = 'none';
    } else if (index === 3) {
      rightArrow.style.display = 'none';
    } else {
      leftArrow.style.display = '';
      rightArrow.style.display = '';
    }
  });


  leftArrow.addEventListener('click', () => {
    index -= 1; 
    currentSlide.style.transform = `translateX(${index * -slideWidth}px)`; 
  });


  rightArrow.addEventListener('click', () => {
    index += 1; 
    currentSlide.style.transform = `translateX(${index * -slideWidth}px)`; 
  });
}