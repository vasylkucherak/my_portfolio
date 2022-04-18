function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Ціна:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фітнес"',
        'Меню "Фітнес" - це новий підхід до приготування страв: більше свіжих овочів і фруктів. Для людей, котрі цікавляться спортом; активних і здорових. Це абсолютно новий продукт з оптимальною ціною і високою якістю!',
        9,
        ".menu .container"
    ).render();
    
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Пісне"',
        'Меню "Пісне" - це ретельний підбір інгредієнтів: відсутність продуктів тваринного походження, молоко з миндалю, вівса, кокосу чи гречки, правильна кількість білків за рахунок тофу і імпортних вегетаріанських стейків.',
        14,
        ".menu .container"
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Преміум"',
        'В меню "Преміум" ми використовуємо не тільки красивий дизайн упаковки, але й створення якісних страв. Червона риба, морепродукти, фрукти - ресторанне меню без відвідування ресторану!',
        21,
        ".menu .container"
    ).render();
}

export default cards;