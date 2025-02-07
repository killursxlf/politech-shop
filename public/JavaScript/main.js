function sortProducts() {
    const sortOption = document.getElementById("sort").value; 
    const productGrids = document.querySelectorAll(".product-grid"); 

    const allProducts = [];
    productGrids.forEach(grid => {
        allProducts.push(...Array.from(grid.querySelectorAll(".product")));
    });

    allProducts.sort((a, b) => {
        const priceA = parseFloat(a.querySelector("p").textContent.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b.querySelector("p").textContent.replace(/[^\d.]/g, ""));

        return sortOption === "priceAsc" ? priceA - priceB : priceB - priceA;
    });

    productGrids.forEach(grid => grid.innerHTML = "");

    let currentGridIndex = 0;
    allProducts.forEach((product, index) => {
        productGrids[currentGridIndex].appendChild(product);

        if ((index + 1) % 4 === 0 && currentGridIndex < productGrids.length - 1) {
            currentGridIndex++;
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelectorAll(".cart-item");
    const totalPriceElement = document.getElementById("total-price");

    function calculateTotal() {
        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.getAttribute("data-price"));
            const quantity = parseInt(item.querySelector(".cart-item-quantity").value, 10);
            total += price * quantity;
        });
        totalPriceElement.textContent = total.toFixed(2); 
    }


    cartItems.forEach(item => {
        const quantityInput = item.querySelector(".cart-item-quantity");
        quantityInput.addEventListener("input", () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1; 
            }
            calculateTotal(); 
        });

        const removeButton = item.querySelector(".remove-from-cart");
        removeButton.addEventListener("click", () => {
            item.remove();
            calculateTotal(); 
        });
    });


    calculateTotal();
});
