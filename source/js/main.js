'usw strict'

const screenWidth = screen.width;
const consultationButton = document.querySelector('.consultation__button');

if (screenWidth < 767) {
  consultationButton.textContent = `бесплатная консультация`
}