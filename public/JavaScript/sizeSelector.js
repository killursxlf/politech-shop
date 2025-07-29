document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('categorySelect');
  const sizesFieldset = document.getElementById('sizesFieldset');
  const sizesContainer = document.getElementById('sizesContainer');

  // Размеры для разных категорий
  const sizeSets = {
    clothes: ['S', 'M', 'L', 'XL', 'XXL'],
    shoesAndSocks: ['35', '36', '37', '38', '40', '41']
  };

  function renderSizes(sizes) {
    sizesContainer.innerHTML = ''; // очистить

    sizes.forEach(size => {
      const id = `size_${size}`;
      const label = document.createElement('label');
      label.style.cursor = 'pointer';
      label.style.userSelect = 'none';
      label.style.padding = '5px 10px';
      label.style.border = '1px solid #ccc';
      label.style.borderRadius = '4px';
      label.style.display = 'inline-flex';
      label.style.alignItems = 'center';
      label.style.gap = '6px';
      label.style.transition = 'background-color 0.3s, border-color 0.3s';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'size';
      checkbox.value = size;
      checkbox.id = id;
      checkbox.style.cursor = 'pointer';

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(size));

      // Навесим стиль при наведении и при выделении
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          label.style.backgroundColor = '#4CAF50';
          label.style.color = 'white';
          label.style.borderColor = '#4CAF50';
        } else {
          label.style.backgroundColor = '';
          label.style.color = '';
          label.style.borderColor = '#ccc';
        }
      });

      sizesContainer.appendChild(label);
    });
  }

  categorySelect.addEventListener('change', () => {
    const val = categorySelect.value;
    if (!val) {
      sizesFieldset.disabled = true;
      sizesContainer.innerHTML = '';
      return;
    }

    // Разрешаем выбор размеров
    sizesFieldset.disabled = false;

    if (val === 'shoes' || val === 'socks') {
      renderSizes(sizeSets.shoesAndSocks);
    } else {
      renderSizes(sizeSets.clothes);
    }
  });
});
