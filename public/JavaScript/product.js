document.addEventListener('DOMContentLoaded', () => {
    const sizeOptions = document.querySelectorAll('.product-sizes .size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    const addToCartButton = document.querySelector('.add-to-cart');
    
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function() {

            const selectedSizeElem = document.querySelector('.product-sizes .size-option.selected');
            if (!selectedSizeElem) {
                alert('Будь ласка, оберіть розмір!');
                return;
            }
            const selectedSize = selectedSizeElem.dataset.size;

            const article = this.dataset.article;
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;

            addToCart(article, name, price, image, selectedSize);
            
            alert(`Товар ${name} (розмір ${selectedSize}) додано до кошика.`);
        });
    }
});
