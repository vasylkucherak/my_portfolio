'use strict'

// AnimationByScroll
const upBtn = document.querySelector('.up_btn');
let isScrolling = false;

window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
    if (isScrolling == false) {
        window.requestAnimationFrame(function() {
            scrolling(e);
            isScrolling = false;
        });
    }
    isScrolling = true;

    if (window.pageYOffset > window.innerHeight - 1) {
        hamburger.classList.add('active');
        upBtn.classList.add('active');
    } else {
        hamburger.classList.remove('active');
        upBtn.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", scrolling, false);

const firstTitle = document.querySelector(".title.title_fz48.promo__title"),
      anotherTitles = document.querySelectorAll(".title.title_fz36"),
      interests = document.querySelectorAll('.interest'),
      filling = document.querySelectorAll('.filling'),
      scale = document.querySelectorAll('.scale__item'),
      skills = document.querySelectorAll('.skills__item'),
      portfolios = document.querySelectorAll('.portfolio__item'),
      contacts = document.querySelectorAll('.contact_card');

function scrolling(e) {

    if (isPartiallyVisible(firstTitle)) {
        firstTitle.classList.add("actived");
    }

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];

        if (isPartiallyVisible(skill)) {
            skill.classList.add("actived");
        }
    }

    // Auto scale filling
    interests.forEach((interest, i) => {
        if (isFullyVisible(scale[i])) {
            filling[i].style.width = interest.innerHTML;
        } else {
            filling[i].style.width = '0';
        }
    });

    for (let i = 0; i < portfolios.length; i++) {
        const portfolio = portfolios[i];

        if (isPartiallyVisible(portfolio)) {
            portfolio.classList.add("actived");
        }
    }

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        if (isFullyVisible(contact)) {
            contact.classList.add("actived");
        } else {
            contact.classList.remove("actived");
        }
    }
}

function isFullyVisible(el) {
    const elementBoundary = el.getBoundingClientRect();

    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;

    return ((top >= 0) && (bottom <= window.innerHeight));
}

function isHalfyVisible(el) {
    const elementBoundary = el.getBoundingClientRect();

    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;
    const half = elementBoundary.height / 2;

    return ((top + half >= 0) && (half + window.innerHeight >= bottom));
}

function isPartiallyVisible(el) {
    const elementBoundary = el.getBoundingClientRect();

    const top = elementBoundary.top;
    const bottom = elementBoundary.bottom;
    const height = elementBoundary.height;

    return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}


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

// Slider
const slides = document.querySelectorAll('.resume__slider-slide'),
    slider = document.querySelector('.resume__slider'),
    prev = document.querySelector('.resume__slider-arrow-left'),
    next = document.querySelector('.resume__slider-arrow-right'),
    slidesWrapper = document.querySelector('.resume__slider-wrapper'),
    slidesField = document.querySelector('.resume__slider-field'),
    select = document.getElementsByClassName('select');

let width = window.getComputedStyle(slidesWrapper).width;

let offset = 0,
    slideIndex = 1;

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

// Scroll On Links
let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        let widthTop = document.documentElement.scrollTop,
            hash = this.hash,
            toBlock = document.querySelector(hash).getBoundingClientRect().top,
            start = null;

        requestAnimationFrame(step);

        function step(time) {
            if (start === null) {
                start = time;
            }

            let progress = time - start,
                r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));
                document.documentElement.scrollTo(0, r);

            if (r != widthTop + toBlock) {
                requestAnimationFrame(step);
            } else {
                location.hash = hash;
            }
        }
    });
});