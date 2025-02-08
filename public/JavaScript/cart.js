// cart.js – Управление корзиной через localStorage

// Функция для загрузки корзины из localStorage (если её нет, возвращаем пустой массив)
function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Функция для сохранения корзины в localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Функция добавления товара в корзину
  function addToCart(article, name, price, image, size) {
    let cart = loadCart();
  
    // Если товар может отличаться по размеру, учитываем его при поиске
    let existingProduct = cart.find(item => item.article === article && item.size === size);
  
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ article, name, price, image, size, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
    displayCartItems();
  }
  
  // Функция обновления счетчика товаров (например, для шапки сайта)
  function updateCartCount() {
    let cart = loadCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  }
  
  // Функция отрисовки товаров в корзине и расчёта итоговой суммы
  function displayCartItems() {
    let cart = loadCart();
    let cartContainer = document.getElementById('cart-items');
    let cartTotalElement = document.getElementById('cart-total');
  
    if (!cartContainer) return;
    
    // Очищаем контейнер перед обновлением
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartContainer.textContent = 'Корзина пуста';
      if (cartTotalElement) cartTotalElement.textContent = '';
      return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
      total += item.price * item.quantity;
      let itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" class="cart-item-image" alt="${item.name}">
        <div class="cart-item-details">
            <h1 class="product-title">${item.name}</h1> 
            <p class="cart-item-sku">Артикул: ${item.article}</p>
            <p class="cart-item-price">Ціна: ${item.price} грн</p>
            <p class="cart-item-size">Розмір: ${item.size}</p>
            <div class="cart-item-actions">
                <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-article="${item.article}" data-size="${item.size}">
                <button onclick="removeFromCart('${item.article}', '${item.size}')">Видалити</button>
            </div>
        </div>
      `;
      cartContainer.appendChild(itemElement);
    });
    
    if (cartTotalElement) {
      cartTotalElement.innerHTML = `<p>Сума: ${total.toFixed(2)} грн</p>`;
    }
  }
  
  // Функция обновления количества товара в корзине
  // Если newQuantity <= 0, товар удаляется
  function updateCartItem(article, size, newQuantity) {
    let cart = loadCart();
    let item = cart.find(item => item.article === article && item.size === size);
    
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        cart = cart.filter(i => !(i.article === article && i.size === size));
      }
      saveCart(cart);
      updateCartCount();
      displayCartItems();
    }
  }
  
  // Функция удаления товара из корзины
  function removeFromCart(article, size) {
    let cart = loadCart();
    cart = cart.filter(item => !(item.article === article && item.size === size));
    saveCart(cart);
    updateCartCount();
    displayCartItems();
  }
  
  // При загрузке страницы обновляем интерфейс корзины
  document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCartItems();
  
    // Добавляем обработчик для изменения количества через input
    document.getElementById('cart-items').addEventListener('change', (e) => {
      if (e.target && e.target.matches('.cart-item-quantity')) {
        const newQuantity = parseInt(e.target.value);
        const article = e.target.dataset.article;
        const size = e.target.dataset.size;
        updateCartItem(article, size, newQuantity);
      }
    });
  });
  