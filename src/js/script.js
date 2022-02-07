window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    // Menu
    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      menuClose = document.querySelector('.menu__close'),
      menuLink = document.querySelectorAll('.menu__link');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    menuLink.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    menuClose.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    // Auto scale filling
    const interest = document.querySelectorAll('.interest'),
          filling = document.querySelectorAll('.filling');

    interest.forEach((item, i) => {
        filling[i].style.width = item.innerHTML;
    });

    // Slider
    const slides = document.querySelectorAll('.resume__slider-slide'),
        slider = document.querySelector('.resume__slider'),
        prev = document.querySelector('.resume__slider-arrow-left'),
        next = document.querySelector('.resume__slider-arrow-right'),
        slidesWrapper = document.querySelector('.resume__slider-wrapper'),
        slidesField = document.querySelector('.resume__slider-field'),
        select = document.getElementsByClassName('select');

    let offset = 0,
        slideIndex = 1,
        width = '660px';

    select[slideIndex - 1].classList.add('active');
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #FFA501;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            select[slideIndex - 1].classList.remove('active');
            slideIndex = 1;
            select[slideIndex - 1].classList.add('active');
        } else {
            select[slideIndex - 1].classList.remove('active');
            slideIndex++;
            select[slideIndex - 1].classList.add('active');
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            select[slideIndex - 1].classList.remove('active');
            slideIndex = slides.length;
            select[slideIndex - 1].classList.add('active');
        } else {
            select[slideIndex - 1].classList.remove('active');
            slideIndex--;
            select[slideIndex - 1].classList.add('active');
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            select[slideIndex - 1].classList.remove('active');
            slideIndex = slideTo;
            select[slideIndex - 1].classList.add('active');
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[slideIndex-1].style.opacity = 1;
        });
    });
});