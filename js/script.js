
$(document).ready(function () {
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


    let menuLinks = document.querySelectorAll('.nav__link');

    if($(document).width() <= 1024){
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          toggleMenu();
        })
      })
    }
   

    function toggleMenu() {
      menu.toggleClass('burger-menu_active');

      if (menu.hasClass('burger-menu_active')) {
        $('body').css('overlow', 'hidden');
      } else {
        $('body').css('overlow', 'visible');
      }
    }
  }

  burgerMenu('.header')


  var $slider1 = $('.first__slider');
  var $progressBar1 = $('#progress-1');
  var $progressBarLabel1 = $('#progress-1 .slider__label');

  $slider1.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var calc = ((nextSlide + 1) / (slick.slideCount)) * 100;

    $progressBar1
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc);

    $progressBarLabel1.text(calc + '% completed');
  });

  $slider1.slick({
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


  var $slider2 = $('.second__slider');
  var $progressBar2 = $('#progress-2');
  var $progressBarLabel2 = $('#progress-2 .slider__label');

  $slider2.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    var calc = ((nextSlide + 1) / (slick.slideCount)) * 100;

    $progressBar2
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc);

    $progressBarLabel2.text(calc + '% completed');
  });

  $slider2.slick({
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

  function visible(elem) { //события при скролле
    var docViewTop = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elemTop = $(elem).offset().top,
      elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  let descrBlock = document.querySelectorAll('.advantages__elem');

  for (let i = 1; i <= descrBlock.length; i++) { //показать преимущества

    window.addEventListener('scroll', function look_scroll() {
      if (visible('[data-order="' + i + '"]')) {

        showAdvantages('[data-order="' + i + '"]');
        this.window.removeEventListener('scroll', look_scroll);
      }
    });
  }

  function showAdvantages(block) {
    document.querySelector(block + ' h3').style.top = '0';
    document.querySelector(block + ' p').style.top = '0';

  }
  let showEmployees = document.querySelectorAll('.show__more');

  showEmployees.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) {
        btn.innerHTML = 'Читать далее'
      } else {
        btn.innerHTML = 'Скрыть'
      }
      btn.classList.toggle('active')
      btn.parentElement.querySelector('.ellipsis').classList.toggle('active');
      btn.parentElement.querySelector('.employee__hidden').classList.toggle('active');
    })
  });


  function showFile() {
    console.log(1);
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

  function fillCounter() {  //счетчик сотрудников
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

  function showDots() { //заполнение точек

    let dots = document.querySelectorAll('.map__dot');

    for (let i = 1; i < dots.length; i++) {
      dots[0].style.display = 'block';
      setTimeout(() => {
        dots[i].style.display = 'block';
      }, Math.floor(Math.random() * 1000) + 500)
    }

  }

  let links = document.querySelectorAll('.faq__elem'); //показать вкладки faq 
  let tabImages = document.querySelectorAll('.faq__arrow')
  let tabs = document.querySelectorAll('.faq__description')



  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {

      tabImages[i].classList.toggle('active');
      tabs[i].classList.toggle('active');
      this.classList.toggle('active');
    })
  }

  document.querySelector('#year').innerHTML = new Date().getFullYear();

  let radioLabels = document.querySelectorAll('.radio__label')
  radioLabels.forEach(label => {
    label.addEventListener('click', () => {

      radioLabels.forEach(label => {
        label.classList.remove('active');
      })
      let input = label.querySelector('input')
      input.checked = true;
      label.classList.add('active');
      document.querySelector('.change').classList.toggle('textarea');
    })
  })

 

  document.querySelector('.form__submit').addEventListener('click', () => {
    closePopup(formPopup);
    openPopup(thkPopup);
  })



  let nameInput = document.querySelector('#name-input');  // валидатор
  let phoneInput = document.querySelector('#phone-input');
  let checkbox = document.querySelector('#agreement-checkbox');
  let submitBtn = document.querySelector('.form__submit');

  nameInput.addEventListener('keyup', () => {
    validateForm();
  })
  phoneInput.addEventListener('keyup', () => {
    validateForm();
  })

  function changeChechbox() {
    checkbox.classList.contains("checked") === false ? checkbox.checked = true : checkbox.checked = false;
    document.querySelector('.check__label input').classList.toggle('checked');
  }

  function validateForm() {
    if (nameInput.value != '' && phoneInput.value != '' && checkbox.checked === true) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  
  
});

formPopup = document.querySelector('.form__popup'); //скрыть и показать всплывающие окна
thkPopup = document.querySelector('.thk__popup');
videoPopup = document.querySelector('.video__popup');

function openPopup(popup) {
  popup.style.display = 'flex';
}
function closePopup(popup) {
  popup.style.display = 'none';
}

