'usw strict'

const screenWidth = screen.width;
const consultationButton = document.querySelector('.consultation__button');
const aboutCompanyDescription = document.querySelector('.about-company__container')

if (screenWidth < 767) {
  consultationButton.textContent = `бесплатная консультация`
}

if (screenWidth < 1023) {
  aboutCompanyDescription.textContent = `..`
}