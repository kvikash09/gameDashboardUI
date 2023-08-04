// Initialize the cart and cartTotal
let cart = [];
let cartTotal = 0;
let favorites = [];

// Function to fetch products from a JSON file
function fetchProducts() {
  return fetch("products.json").then((response) => response.json());
}

// Function to render the product list
function renderProducts() {
  fetchProducts()
    .then((data) => {
      const productListElement = document.getElementById("product-list");
      productListElement.innerHTML = "";

      data.products.forEach((product) => {
        const productItem = `
                        <div class="col-md-4 mb-3">
                            <div class="card m-3 shadow-lg bg-info-subtle rounded-3">
                            <div class="favorite-icon">
                                <i class="${
                                  favorites.includes(product.id) ? "fas" : "far"
                                } fa-heart fa-2x" onclick="toggleFavorite(${
          product.id
        })"></i>
                            </div>
                            <img src="${
                              product.image
                            }" class="card-img-top" alt="${product.name}">
                            
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">Price: ₹ ${product.price.toFixed(
                                      2
                                    )}</p>
                                    <button class="btn btn-outline-primary btn-sm rounded-pill shadow-sm" onclick="addToCart(${
                                      product.id
                                    })">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
        productListElement.insertAdjacentHTML("beforeend", productItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Function to add an item to the cart
function addToCart(productId) {
  fetchProducts()
    .then((data) => {
      const productToAdd = data.products.find(
        (product) => product.id === productId
      );
      if (productToAdd) {
        cart.push({ ...productToAdd });
        cartTotal += productToAdd.price;
        renderCart();
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  const indexToRemove = cart.findIndex((item) => item.id === productId);
  if (indexToRemove !== -1) {
    const removedItem = cart.splice(indexToRemove, 1)[0];
    cartTotal -= removedItem.price;
    renderCart();
  }
}

// Function to render the cart items
function renderCart() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = `
                    <li>${item.name} - ₹ ${item.price.toFixed(2)} 
                        <button class="btn btn-outline-danger btn-sm mb-2 rounded-pill shadow-lg" onclick="removeFromCart(${
                          item.id
                        })">Remove</button>
                    </li>
                `;
    cartItemsElement.insertAdjacentHTML("beforeend", cartItem);
  });

  document.getElementById("cart-total").innerText = cartTotal.toFixed(2);
}

// Function to handle the checkout button click
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some products before checking out.");
    return;
  }

  const cartItemsList = cart.map((item) => item.name).join(", ");
  const checkoutMessage = `Thank you for your purchase!\n\nItems: ${cartItemsList}\nTotal: ₹ ${cartTotal.toFixed(
    2
  )}`;
  alert(checkoutMessage);

  // Clear the cart after checkout
  cart = [];
  cartTotal = 0;
  renderCart();
}

// Function to toggle a product's favorite status
function toggleFavorite(productId) {
  const index = favorites.indexOf(productId);
  if (index === -1) {
    favorites.push(productId);
  } else {
    favorites.splice(index, 1);
  }
  renderProducts(); // Update the favorite icon state in the UI
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  document.getElementById("checkout-btn").addEventListener("click", checkout);
});
