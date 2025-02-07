document.addEventListener('DOMContentLoaded', function () {
    const sizeOptions = document.querySelectorAll('.product-sizes .size-option');

    const selectedSize = localStorage.getItem('selectedSize');
    if (selectedSize) {
        const selectedOption = document.querySelector(`.product-sizes .size-option[data-size="${selectedSize}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
    }

    sizeOptions.forEach(function (sizeOption) {
        sizeOption.addEventListener('click', function () {
            sizeOptions.forEach(option => option.classList.remove('selected'));

            this.classList.add('selected');
            
            localStorage.setItem('selectedSize', this.getAttribute('data-size'));
            console.log('Размер выбран:', this.getAttribute('data-size'));  
        });
    });

    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', function () {
        const productElement = document.querySelector('.product');
        const nameElement = document.querySelector('.product-title');  
        const articleElement = document.querySelector('.product-sku');
        const priceElement = document.querySelector('.product-price');
        
        console.log('productElement:', productElement);
        console.log('nameElement:', nameElement);
        console.log('articleElement:', articleElement);
        console.log('priceElement:', priceElement);

        if (!productElement || !nameElement || !articleElement || !priceElement) {
            alert('Не все данные для продукта найдены!');
            return;
        }

        const name = nameElement ? nameElement.textContent.trim() : 'Не указан';
        const article = articleElement ? articleElement.textContent.trim() : 'Не указан';
        const price = priceElement ? priceElement.textContent.trim() : 'Не указана';
        const size = localStorage.getItem('selectedSize') || 'Не выбран'; 

        console.log('Добавляем в корзину продукт:', {
            article: article,
            name: name,
            price: price,
            size: size,
        });

        if (!size || size === 'Не выбран') {
            alert('Пожалуйста, выберите размер!');
            return;
        }

        const product = {
            article: article,
            name: name,  
            price: price,
            size: size, 
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert("Товар добавлен в корзину!");
    });
});
