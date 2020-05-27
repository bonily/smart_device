'use strict';

(function () {

  const tabletWidth = '(max-width: 1023px)';
  const mobileWidth = '(max-width: 767px)';
  const consultationButton = document.querySelector('.consultation-button');
  const phonePlace = document.querySelector('#phone');
  const sliceBlocks = document.querySelectorAll('.about-company p');
  const hiddenBlocks = document.querySelectorAll('.page-footer__smart-block');
  const openButtons = document.querySelectorAll('.page-footer__smart-block button');

  if (window.matchMedia(mobileWidth).matches) {
    consultationButton.textContent = 'бесплатная консультация';
  }

  if (window.matchMedia(tabletWidth).matches) {
    for (let i = 0; i < sliceBlocks.length; i++) {
      let block = sliceBlocks[i];
      if (block.textContent.length > 211) {
        block.textContent = block.textContent.slice(0, 211) + '..';
      }
    }
  }

  for (let i = 0; i < hiddenBlocks.length; i++) {
    hiddenBlocks[i].classList.add('page-footer__smart-block--hidden');
  }

  for (let i = 0; i < openButtons.length; i++) {
    let button = openButtons[i];
    button.addEventListener('click', function () {
      button.parentElement.classList.toggle('page-footer__smart-block--hidden');
    });
  }

  const phone = new window.IMask(
      phonePlace, {
        mask: '+{7}(000)000-00-00'
      });

  phonePlace.addEventListener('focus', function () {
    phonePlace.value = '+7(';
  });

  phonePlace.addEventListener('blur', function () {
    if (phonePlace.value.length < 16) {
      phonePlace.value = '';
    }
  });
})();
