// Importing neccessary Identifiers(variables,functions...) from other Js-Module files
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

// Handling navbar toggler
const navToggingContainer = document.querySelector(".amazon-header-toggler");
const togglingMenubar = document.querySelector(".toggling-menubar");
navToggingContainer.addEventListener("click", (e) => {
  const menuBar = e.target;
  if (menuBar.name === "reorder-four-outline") {
    const crossIcon = document.createElement("img");
    crossIcon.src = "./images/Cross-Icon.png";
    navToggingContainer.replaceChild(crossIcon, menuBar);
    togglingMenubar.classList.add("active");
    togglingMenubar.classList.remove("closing");
    togglingMenubar.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    const toggler = `
      <ion-icon name="reorder-four-outline" size="large"></ion-icon>
    `;
    navToggingContainer.removeChild(menuBar);
    navToggingContainer.innerHTML = toggler;
    // togglingMenubar.style.display = "none";
    togglingMenubar.classList.add("closing");
    togglingMenubar.classList.remove("active");
    document.body.style.overflow = "";
  }
});

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
         <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
         ${product.name}
        </div>

        <div class="product-rating-container">
         <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars}.png">
         <div class="product-rating-count link-primary">
            ${product.rating.count}
         </div>
        </div>

        <div class="product-price">
         ₹${product.priceCents}
        </div>

        <div class="product-quantity-container">
         <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
         </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
         <img src="images/icons/checkmark.png">
         Added
        </div>

        <button class="add-to-cart-button button-primary add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}">
         Add to Cart
        </button>
    </div>
    `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

// function for calculating & updating the cartQuantity on the page
function updateCartQuantity() {
  // Calculate the total cart quantity
  const realCart = JSON.parse(localStorage.getItem("cart"));
  let totalQuantity = 0;
  realCart.forEach((item) => {
    totalQuantity += Number(item.quantity);
  });
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  // Upadate the totalQuantity in the cart-logo while presistanting it but not show when totalQuantity is 0
  if (totalQuantity != 0) {
    document.querySelector(".js-cart-quantity-smallDevices").innerHTML =
      JSON.parse(localStorage.getItem("totalQuantity"));
    document.querySelector(".js-cart-quantity").innerHTML = JSON.parse(
      localStorage.getItem("totalQuantity")
    );
  }
}

// Make it interactive by adding the functionality to addCart btn
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    // Call the addToCart function for adding the products in the cart
    addToCart(productId, productName);
    // Update the cartQuantity on page when user adding items to the cart
    updateCartQuantity();
  });
});

// Update the cartQuantity on the page when user come to home-page form another page
updateCartQuantity();
