window.addEventListener('DOMContentLoaded', () => {
    // Activate Menu
    const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      menuClose = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
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