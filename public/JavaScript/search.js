document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-form input[name="q"]');
    const resultsContainer = document.getElementById('search-results'); 
  
    if (searchInput) {
      searchInput.addEventListener('input', async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) { 
          resultsContainer.innerHTML = '';
          return;
        }
        
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          renderSearchResults(data.results);
        } catch (error) {
          console.error('Ошибка при поиске:', error);
        }
      });
    }
    
    function renderSearchResults(results) {
      if (!resultsContainer) return;
      resultsContainer.innerHTML = '';
      
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p>Ничего не найдено</p>';
        return;
      }
      
      const list = document.createElement('ul');
      results.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="/products/${product.article}">
                          <img src="/images/${product.category}/${product.article}.jpg" alt="${product.name}" style="width:50px; margin-right:10px;">
                          ${product.name} - ${product.price} грн
                        </a>`;
        list.appendChild(li);
      });
      resultsContainer.appendChild(list);
    }
  });
  