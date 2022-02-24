$(document).ready(function(){

    // Slider
    $('.carousel__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // Toggle side of the card
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');  
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    // Validate forms
    function validateForm(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Ваш адрес почты должен быть в формате: name@domain.com"
                }
              }
        });
    }

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    // Masked input
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //Send message
    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1820) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href='#up'], a[href='#catalog']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // animationByScroll
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
    }

    document.addEventListener("DOMContentLoaded", scrolling, false);

    const animItems = document.querySelectorAll(".reviews-item");

    function scrolling(e) {

        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];

            if (isHalfyVisible(animItem)) {
                animItem.classList.add("active");
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
});