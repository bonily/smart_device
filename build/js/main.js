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
  const allTextContents = [];
  const lazyImages = document.querySelectorAll('.lazy-bg');

  window.addEventListener("scroll", function () {
    deleteLazyClass();
    window.removeEventListener('scroll', deleteLazyClass);
  });

  function deleteLazyClass() {
    for (let i = 0; i < lazyImages.length; i++) {
      lazyImages[i].classList.remove('lazy-bg');
    }
  }

  window.addEventListener('resize', function () {
    consultationButton.textContent = 'получить бесплатную консультацию';
    if (window.matchMedia(mobileWidth).matches) {
      consultationButton.textContent = 'бесплатная консультация';
    }


    for (let i = 0; i < sliceBlocks.length; i++) {
      const block = sliceBlocks[i];
      allTextContents.push(block.textContent);
      if (window.matchMedia(tabletWidth).matches) {
        if (block.textContent.length > 209) {
          const sliceTextContent = block.textContent.slice(0, 209) + '..';
          block.textContent = sliceTextContent;
        }
      } else {
        block.textContent = allTextContents[i];
      }
    }
  });


  for (let i = 0; i < hiddenBlocks.length; i++) {
    hiddenBlocks[i].classList.add('page-footer__smart-block--hidden');
  }

  let activeSmartBlock;

  for (let i = 0; i < openButtons.length; i++) {

    let button = openButtons[i];
    let block = button.parentElement;

    button.addEventListener('click', function () {
      if (activeSmartBlock) {
        activeSmartBlock.classList.add('page-footer__smart-block--hidden');
      }

      if (block.classList.contains('page-footer__smart-block--hidden')) {
        activeSmartBlock = block;
      }
      button.parentElement.classList.toggle('page-footer__smart-block--hidden');
    });
  }


  function createPhoneMask(element) {
    element.placeholder = '+7(';

    element.addEventListener('blur', function () {
      if (element.value.length < 16) {
        element.value = '';
        element.placeholder = 'Телефон';
      }
    });

    return new window.IMask(
        element, {
          mask: '+{7}(000)000-00-00'
        });
  }

  callButton.addEventListener('click', function () {
    popapMessage = popapMessageTemplate.cloneNode(true);
    popapMessage.classList.remove('popap__template');

    let closePopapButton = popapMessage.querySelector('.popap__close-button');
    let form = popapMessage.querySelector('.popap__form');
    let popapNamePlace = popapMessage.querySelector('#popap-name');
    let popapPhonePlace = popapMessage.querySelector('#popap-phone');
    let popapTextMessage = popapMessage.querySelector('#popap-comment');

    popapNamePlace.focus();
    popapNamePlace.value = window.localStorage.getItem('name') || '';
    popapPhonePlace.value = window.localStorage.getItem('number')|| '';
    popapTextMessage.value = window.localStorage.getItem('message') || '';
    popapPlace.appendChild(popapMessage);
    popapPhonePlace.addEventListener('focus', function () {
      createPhoneMask(popapPhonePlace);
    });


    form.addEventListener('submit', function () {
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

  phonePlace.addEventListener('focus', function () {
    createPhoneMask(phonePlace);
  });
})();
