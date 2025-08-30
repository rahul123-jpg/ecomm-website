const cartCountSpan = document.getElementById("cart-count");

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let totalCount = 0;
  cartItems.forEach(item => totalCount += item.quantity);
  cartCountSpan.textContent = totalCount;
}

// Increase / Decrease quantity
document.querySelectorAll(".increase-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const quantitySpan = btn.parentElement.querySelector(".quantity");
    let count = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = count + 1;
  });
});

document.querySelectorAll(".decrease-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const quantitySpan = btn.parentElement.querySelector(".quantity");
    let count = parseInt(quantitySpan.textContent);
    if (count > 0) quantitySpan.textContent = count - 1;
  });
});

// Add to cart button
document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const name = card.getAttribute("data-name");
    const price = card.getAttribute("data-price");
    const img = card.getAttribute("data-img");
    const quantity = parseInt(card.querySelector(".quantity").textContent);

    if (quantity === 0) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ name, price, img, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    card.querySelector(".quantity").textContent = "0";
  });
});

// Buy Now button
document.querySelectorAll(".buy-now-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const name = card.getAttribute("data-name");
    const price = card.getAttribute("data-price");
    const img = card.getAttribute("data-img");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.name === name);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Go to cart page directly
    window.location.href = "cart.html";
  });
});

// Cart page redirection
document.getElementById("cart-btn").addEventListener("click", () => {
  window.location.href = "cart.html";
});

updateCartCount();
