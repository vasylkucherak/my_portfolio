window.addEventListener('DOMContentLoaded', () => {
    // Activate Menu
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
});