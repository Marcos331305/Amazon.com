import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";
cart.forEach((cartItem) => {
  let matchingItem;
  products.forEach((product) => {
    if (product.id === cartItem.id) {
      matchingItem = product;
    }
  });
  const html = `
                <div id="${cartItem.id}" class="cart-item-container js-item-container">
                        <div class="delivery-date">
                        Delivery date: Tuesday, June 21
                        </div>
        
                        <div class="cart-item-details-grid">
                        <img class="product-image"
                            src="${matchingItem.image}">
        
                        <div class="cart-item-details">
                            <div class="product-name">
                             ${cartItem.productName}
                            </div>
                            <div class="product-price">
                             ₹${matchingItem.priceCents}
                            </div>
                            <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span data-item-id="${cartItem.id}" class="delete-quantity-link link-primary js-delete-link">
                                Delete
                            </span>
                            </div>
                        </div>
        
                        <div class="delivery-options">
                            <div class="delivery-options-title">
                            Choose a delivery option:
                            </div>
                            <div class="delivery-option">
                            <input type="radio" checked
                                class="delivery-option-input"
                                name="delivery-option-${cartItem.id}">
                            <div>
                                <div class="delivery-option-date">
                                Tuesday, June 21
                                </div>
                                <div class="delivery-option-price">
                                FREE Shipping
                                </div>
                            </div>
                            </div>
                            <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${cartItem.id}">
                            <div>
                                <div class="delivery-option-date">
                                Wednesday, June 15
                                </div>
                                <div class="delivery-option-price">
                                 ₹120 - Shipping
                                </div>
                            </div>
                            </div>
                            <div class="delivery-option">
                            <input type="radio"
                                class="delivery-option-input"
                                name="delivery-option-${cartItem.id}">
                            <div>
                                <div class="delivery-option-date">
                                Monday, June 13
                                </div>
                                <div class="delivery-option-price">
                                ₹199 - Shipping
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            `;
  productsHTML += html;
});

document.querySelector(".js-order-summary").innerHTML = productsHTML;

function removeProductFromOrderSummary(itemId) {
  const product = document.getElementById(itemId);
  product.remove();
}

// adding the functionality to the delete button
const deleteBtn = document.querySelectorAll(".js-delete-link");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const btn = event.target;
    const itemId = btn.dataset.itemId;
    removeProductFromOrderSummary(itemId);
    removeFromCart(itemId);
  });
});
