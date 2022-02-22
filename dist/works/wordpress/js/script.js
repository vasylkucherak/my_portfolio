// Scroll
let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.5;

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

// Modal window
let btnPressed = false;

function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector);

    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }

            btnPressed = true;

            if (destroy) {
                item.remove();
            }

            openModal(modalSelector);
        });
    });

    close.addEventListener('click', () => {
        closeModal(modalSelector);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display == "block") { 
            closeModal(modalSelector);
        }
    });
}

function openModal(selector) {
    const scroll = calcScroll();
    document.querySelector(selector).style.display = "block";
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scroll}px`;
}

function closeModal(selector) {
    document.querySelector(selector).style.display = "none";
    document.body.style.overflow = ""; 
    document.body.style.marginRight = `0px`;
}

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

const button = document.querySelector('#confirm.btn'),
      inputs = document.querySelectorAll('input');
      
button.addEventListener('click', (e) => {
    inputs.forEach(input => {
        input.value == '';
    });

});

bindModal('[data-modal]', '.modal', '[data-close]');