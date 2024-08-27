import { cart, removeFromCart } from "../data/cart.js"; // Named Exports
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
// Importing ESM-version of day.JS Library using JS-Modules
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs"; // Default-Export Syntax

let productsHTML = "";
cart.forEach((cartItem) => {
  let matchingItem;
  products.forEach((product) => {
    if (product.id === cartItem.id) {
      matchingItem = product;
    }
  });
  const html = `
                <div id="${
                  cartItem.id
                }" class="cart-item-container js-item-container">
                        <div class="delivery-date js-delivery-date">
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
                                Quantity: <span class="quantity-label">${
                                  cartItem.quantity
                                }</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span data-item-id="${
                              cartItem.id
                            }" class="delete-quantity-link link-primary js-delete-link">
                                Delete
                            </span>
                            </div>
                        </div>
        
                        <div class="delivery-options">
                            <div class="delivery-options-title">
                            Choose a delivery option:
                            </div>
                            ${deliveryOptionsHTML(cartItem)}
                        </div>
                     </div>
                </div>
            `;
  productsHTML += html;
});

function deliveryOptionsHTML(cartItem) {
  let allDeliveryOptinsHTML = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const deliveryPrice =
      deliveryOption.priceCents === 0
        ? "FREE "
        : `₹${deliveryOption.priceCents} - Shipping`;
    const isChecked =
      cartItem.deliveryOptionId === deliveryOption.id ? "checked" : "";
    const html = `
            <div class="delivery-option">
                <input type="radio" ${isChecked}
                class="delivery-option-input js-delivery-option-input"
                name="delivery-option-${cartItem.id}" value="${deliveryOption.id}" data-delivery-date="${dateString}">
                <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                     ${deliveryPrice}
                    </div>
                </div>
            </div>
        `;
    allDeliveryOptinsHTML += html;
  });
  return allDeliveryOptinsHTML;
}

// testing code for updation of final date


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

// Using day.JS library to showing delivery dates on checkout-page
/*
Best Practice in Programming --->
=> When we need something complicated,
1. Try to find an external Library first.
2. Before writing the code ourselves. 
*/
// const now = dayjs();
// const todaysDate = now.format('YYYY-MM-DD');
// console.log('todaysDate : ',todaysDate);
// const newDate = now.add(7,'day');
// const deliveryDate = newDate.format('dddd, MMMM D');
// console.log('deliverDate(after 7 days) : ',deliveryDate);
