document.addEventListener('DOMContentLoaded', () => {
    // Обработчик клика для выбора размера
    const sizeOptions = document.querySelectorAll('.product-sizes .size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Убираем выделение со всех размеров
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            // Выделяем нажатый элемент
            option.classList.add('selected');
        });
    });
    
    // Обработчик для кнопки "Додати до кошика"
    const addToCartButton = document.querySelector('.add-to-cart');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {
            // Получаем выбранный размер
            const selectedSizeElem = document.querySelector('.product-sizes .size-option.selected');
            if (!selectedSizeElem) {
                alert('Будь ласка, оберіть розмір!');
                return;
            }
            const selectedSize = selectedSizeElem.dataset.size;
            
            // Извлекаем данные товара из data-атрибутов кнопки
            const article = this.dataset.article;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;
            
            // Вызываем функцию добавления товара в корзину с выбранным размером
            addToCart(article, name, price, image, selectedSize);
            
            alert(`Товар ${name} (розмір ${selectedSize}) додано до кошика.`);
        });
    }
});
