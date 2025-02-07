document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы для отображения товаров в корзине
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Функция для рендеринга товаров в корзине
    function renderCart() {
        // Очищаем контейнер перед рендерингом
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
            cartTotalContainer.innerHTML = '<p>Сумма: 0 грн</p>';
            return;
        }

        let total = 0;


        cart.forEach(function (product, index) {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.dataset.index = index;

            cartItem.innerHTML = `
                <img src="/images/instock_page/${product.article}.jpg" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-title">${product.name}</p>
                    <p class="cart-item-sku">Артикул: ${product.article}</p>
                    <p class="cart-item-price">Ціна: ${product.price} грн</p>
                    <p class="cart-item-size">Розмір: ${product.size}</p>
                    <div class="cart-item-actions">
                        <input type="number" class="cart-item-quantity" value="1" min="1">
                        <button class="remove-from-cart">Видалити</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            total += parseFloat(product.price);
        });

        cartTotalContainer.innerHTML = `<p>Сумма: ${total} грн</p>`;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        renderCart(); 
    }

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.closest('.cart-item').dataset.index;
            removeFromCart(index);
        }
    });

    cartItemsContainer.addEventListener('input', function (event) {
        if (event.target.classList.contains('cart-item-quantity')) {
            const quantity = event.target.value;
            const index = event.target.closest('.cart-item').dataset.index;
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart)); 
            renderCart(); 
        }
    });

    renderCart();
});
