function burgerMenu(selector) { //adaptive menu
  let menu = $(selector);
  let button = menu.find('.burger-menu_button', '.burger-menu_lines');
  let links = menu.find('.burger-menu_link');
  let overlay = menu.find('.burger-menu_overlay');

  button.on('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  links.on('click', () => toggleMenu());
  overlay.on('click', () => toggleMenu());

  function toggleMenu() {
    menu.toggleClass('burger-menu_active');

    if (menu.hasClass('burger-menu_active')) {
      $('body').css('overlow', 'hidden');
    } else {
      $('body').css('overlow', 'visible');
    }
  }
}

burgerMenu('.header');

$('.first__slider').slick({
  infinite: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
});
$('.second__slider').slick({
  infinite: true,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
});

let links = document.querySelectorAll('.faq__title--block');
let tabImages = document.querySelectorAll('.faq__arrow')
let tabs = document.querySelectorAll('.faq__description')

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function () {

    tabImages[i].classList.toggle('active');
    tabs[i].classList.toggle('active');
    this.classList.toggle('active');
  })
}

let radioLabels = document.querySelectorAll('.radio__label')
radioLabels.forEach(label => {
  label.addEventListener('click', () => {

    radioLabels.forEach(label => {
      label.classList.remove('active');
    })
    let input = label.querySelector('input')
    console.log(1);
    input.checked = true;
    label.classList.add('active');
    document.querySelector('.change').classList.toggle('textarea');
  })
})

formPopup = document.querySelector('.form__popup');
thkPopup = document.querySelector('.thk__popup');
videoPopup = document.querySelector('.video__popup');

// document.querySelector('.video__container').addEventListener('click', () => {
//   open_popup(videoPopup);
// })
// document.querySelector('.play__video').addEventListener('click', () => {
//   open_popup(videoPopup);
// })
// document.querySelector('.video__close').addEventListener('click', () => {
//   close_popup(videoPopup);
// })
// document.querySelector('.open__form').addEventListener('click', () => {
//   open_popup(formPopup);
// })
// document.querySelector('.form__close').addEventListener('click', () => {
//   close_popup(formPopup);
// })
// document.querySelector('.fill__form').addEventListener('click', () => {
//   open_popup(formPopup);
// })
// document.querySelector('.thk__close').addEventListener('click', () => {
//   close_popup(thkPopup);
// })
// document.querySelector('.thk__btn').addEventListener('click', () => {
//   close_popup(thkPopup);
// })
document.querySelector('.form__submit').addEventListener('submit', (event) => {
  event.preventDefault();
  close_popup(formPopup);
  open_popup(formPopup);
})


function open_popup(popup) {
  popup.style.display = 'flex';
}
function close_popup(popup) {
  popup.style.display = 'none';
}

document.querySelector('#year').innerHTML = new Date().getFullYear()

function visible(elem) {
  var docViewTop = $(window).scrollTop(),
    docViewBottom = docViewTop + $(window).height(),
    elemTop = $(elem).offset().top,
    elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

window.addEventListener('scroll', function findCounter() {
  if (visible(".counter")) {
    fillCounter();
    this.window.removeEventListener('scroll', findCounter);
  }
})
window.addEventListener('scroll', function findMap() {
  if (visible(".map__block")) {
    showDots();
    this.window.removeEventListener('scroll', findMap);
  }
})


function fillCounter() {
  let counter = document.querySelector('.counter');
  let counterInterval = setInterval(counterAdd, Math.floor(Math.random() * 50) + 1);

  function counterAdd() {
    counter.innerHTML = Number(counter.innerHTML) + Math.floor(Math.random() * 11);
    if (Number(counter.innerHTML) >= 200) {
      counter.innerHTML = '200+';
      clearInterval(counterInterval);
    }
  }
}

function showDots() {

  let dots = document.querySelectorAll('.map__dot');

  for (let i = 1; i < dots.length; i++) {
    dots[0].style.display = 'block';
    setTimeout(() => {
      dots[i].style.display = 'block';
    }, Math.floor(Math.random() * 1000) + 500)
  }

}

let descrBlock = document.querySelectorAll('.advantages__elem');

for (let i = 1; i <= descrBlock.length; i++) {

  window.addEventListener('scroll', function look_scroll() {
    if (visible('[data-order="' + i + '"]')) {

      showAdvantages('[data-order="' + i + '"]');
      this.window.removeEventListener('scroll', look_scroll);
    }
  });
}
let showEmployees = document.querySelectorAll('.show__more');

showEmployees.forEach(btn => {
  btn.addEventListener('click', () => {

   
   
    if(btn.classList.contains('active')){
        btn.innerHTML = 'Читать далее'
    } else {
      btn.innerHTML = 'Скрыть'
    }
    btn.classList.toggle('active')
    btn.parentElement.querySelector('.ellipsis').classList.toggle('active');
    btn.parentElement.querySelector('.employee__hidden').classList.toggle('active');
  })
});

function showAdvantages(block) {
  document.querySelector(block + ' h3').style.top = '0';
  document.querySelector(block + ' p').style.top = '0';

}
