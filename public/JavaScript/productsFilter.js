document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const productsTableBody = document.querySelector('#products .scroll-body tbody');


  function renderProducts(filteredProducts) {
    productsTableBody.innerHTML = '';

    if(filteredProducts.length === 0) {
      productsTableBody.innerHTML = '<tr><td colspan="4">Товары не найдены</td></tr>';
      return;
    }

    filteredProducts.forEach(product => {
      const row = document.createElement('tr');

        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>₴${(parseFloat(product.price) || 0).toFixed(2)}</td>
        <td>
            <form action="/admin/products/delete/${product.id}" method="POST" style="display:inline;">
            <input type="hidden" name="category" value="${product.category}">
            <button type="submit" class="btn-danger" onclick="return confirm('Удалить товар ${product.name}?')">Удалить</button>
            </form>
        </td>
        `;

      productsTableBody.appendChild(row);
    });
  }

  renderProducts(productsData);

  searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const nameFilter = searchForm.name.value.trim().toLowerCase();
    const minPrice = parseFloat(searchForm.minPrice.value);
    const maxPrice = parseFloat(searchForm.maxPrice.value);

    const filtered = productsData.filter(product => {
      const price = parseFloat(product.price) || 0;
      const matchesName = product.name.toLowerCase().includes(nameFilter);
      const matchesMinPrice = isNaN(minPrice) || price >= minPrice;
      const matchesMaxPrice = isNaN(maxPrice) || price <= maxPrice;

      return matchesName && matchesMinPrice && matchesMaxPrice;
    });

    renderProducts(filtered);
  });
});
