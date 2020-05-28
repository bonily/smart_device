'use strict';

(function () {

  const popapPlace = document.querySelector('main');
  const tabletWidth = '(max-width: 1023px)';
  const mobileWidth = '(max-width: 767px)';
  const consultationButton = document.querySelector('.consultation-button');
  const phonePlace = document.querySelector('#phone');
  const sliceBlocks = document.querySelectorAll('.about-company p');
  const hiddenBlocks = document.querySelectorAll('.page-footer__smart-block');
  const openButtons = document.querySelectorAll('.page-footer__smart-block button');
  const callButton = document.querySelector('.call-button');
  const popapMessageTemplate = document.querySelector('.popap__template');
  const scrollAdvantagesButton = document.querySelector('.main-block__scroll');
  let popapMessage;


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


  function createPhoneMask(element) {
    return new window.IMask(
        element, {
          mask: '+{7}(000)000-00-00'
        });
  }

  phonePlace.addEventListener('focus', function () {
    phonePlace.value = '+7(';
  });

  phonePlace.addEventListener('blur', function () {
    if (phonePlace.value.length < 16) {
      phonePlace.value = '';
    }
  });

  callButton.addEventListener('click', function () {
    popapMessage = popapMessageTemplate.cloneNode(true);
    popapMessage.classList.remove('popap__template');

    const closePopapButton = popapMessage.querySelector('.popap__close-button');
    const form = popapMessage.querySelector('.popap__form');
    const popapNamePlace = popapMessage.querySelector('#popap-name');
    const popapPhonePlace = popapMessage.querySelector('#popap-phone');
    const popapTextMessage = popapMessage.querySelector('#popap-comment');

    createPhoneMask(popapPhonePlace);
    popapNamePlace.focus();
    popapNamePlace.value = window.localStorage.getItem('name') || '';
    popapPhonePlace.value = window.localStorage.getItem('number') || '';
    popapTextMessage.value = window.localStorage.getItem('message') || '';
    popapPlace.appendChild(popapMessage);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.localStorage.setItem('name', popapNamePlace.value);
      window.localStorage.setItem('number', popapPhonePlace.value);
      window.localStorage.setItem('message', popapTextMessage.value);
      popapPlace.removeChild(popapMessage);
      document.removeEventListener('keydown', onPopapKeydown);
      document.removeEventListener('click', onOverlayClick);
    });

    closePopapButton.addEventListener('click', function () {
      popapPlace.removeChild(popapMessage);
    });

    document.addEventListener('keydown', onPopapKeydown);

    document.addEventListener('click', onOverlayClick);
  });


  function onPopapKeydown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      popapPlace.removeChild(popapMessage);
      document.removeEventListener('keydown', onPopapKeydown);
      document.removeEventListener('click', onOverlayClick);
    }
  }

  function onOverlayClick(evt) {
    if (evt.target.className === 'popap') {
      popapPlace.removeChild(popapMessage);
      document.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onPopapKeydown);
    }
  }
  scrollAdvantagesButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    smoothScroll(scrollAdvantagesButton);
  });

  consultationButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    smoothScroll(consultationButton);
  });

  function smoothScroll(element) {
    const targetElementId = element.getAttribute('href');
    const targetElement = document.querySelector(targetElementId);

    targetElement.scrollIntoView({behavior: "smooth"});
  }

  createPhoneMask(phonePlace);
})();
