function animationByScroll() {
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

    const animItems = document.querySelectorAll(".menu__item");

    function scrolling(e) {

        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];

            if (isHalfyVisible(animItem)) {
                animItem.classList.add("active");
            }
        }
    }
    
    function isHalfyVisible(el) {
        const elementBoundary = el.getBoundingClientRect();

        const top = elementBoundary.top;
        const bottom = elementBoundary.bottom;
        const half = elementBoundary.height / 2;

        return ((top + half >= 0) && (half + window.innerHeight >= bottom));
    }
}

export default animationByScroll;