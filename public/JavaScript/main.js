function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    
    const productGrid = document.querySelector('.product-grid');

    const products = Array.from(productGrid.getElementsByClassName('product'));
  
    products.sort((a, b) => {
      const priceA = parseInt(a.querySelector('.price').getAttribute('data-price'));
      const priceB = parseInt(b.querySelector('.price').getAttribute('data-price'));
  
      if (sortValue === 'priceAsc') {
        return priceA - priceB; 
      }
  
      if (sortValue === 'priceDesc') {
        return priceB - priceA; 
      }
  
      return 0; 
    });
  
    products.forEach(product => productGrid.appendChild(product));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", sortProducts);
    }
  });
  