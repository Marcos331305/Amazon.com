import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js"; // Named Exports
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
<div id="${cartItem.id}" class="cart-item-container js-item-container">
    <div class="delivery-date js-delivery-date js-finaldate-${cartItem.id}">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingItem.image}">

        <div class="cart-item-details">
            <div class="product-name">${cartItem.productName}</div>
            <div class="product-price">₹${matchingItem.priceCents}</div>
            <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span data-item-id="${
                  cartItem.id
                }" class="delete-quantity-link link-primary js-delete-link">Delete</span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
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
            <div class="delivery-option js-delivery-option" data-product-id="${cartItem.id}" data-delivery-option-id="${deliveryOption.id}" data-final-date="${dateString}">
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

// Event Delegation on Dynamically(through JS) added HTML Elements
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".js-delivery-option-input")) {
      // Get the clicked delivery option
      const selectedOption = event.target;
      // Find the closest cart item container
      const cartItemContainer = selectedOption.closest(".js-item-container");
      if (cartItemContainer) {
        // In that cart item container query the delivery-date container using query-selector
        const deliveryDateContainer =
          cartItemContainer.querySelector(".js-delivery-date");
        if (deliveryDateContainer) {
          const finalDate = selectedOption.dataset.deliveryDate;
          deliveryDateContainer.textContent = `Delivery date: ${finalDate}`;
        } else {
          console.log("Targeted .js-delivery-date container not FOUND !");
        }
      } else {
        console.log("closest .js-item-container not FOUND !");
      }
    }
  });
});

/*
Setting up the finalDeliveryDate when the page is loaded or reloaded
---> As we know we are going to setup the first delivery option selected by default for each product of cart
---> So according to this we are going to set the finalDeliveryDate when the page is loaded or reloaded to the date which is present in first delivery option(Free-DeliveryOption)
*/
document.addEventListener("DOMContentLoaded", () => {
  const now = dayjs();
  const newDate = now.add(7, "day");
  const deliveryDate = newDate.format("dddd, MMMM D");
  document
    .querySelectorAll(".js-delivery-date")
    .forEach((finalDeliveryDate) => {
      finalDeliveryDate.textContent = `Delivery date: ${deliveryDate}`;
    });
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

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", (event) => {
    // console.log('clicked');
    const productId = element.dataset.productId;
    const newDeliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, newDeliveryOptionId);
    document.addEventListener("DOMContentLoaded", () => {
      document.addEventListener("change", (event) => {
        if (event.target.matches(".js-delivery-option-input")) {
          // Get the clicked delivery option
          const selectedOption = event.target;
          // Find the closest cart item container
          const cartItemContainer =
            selectedOption.closest(".js-item-container");
          if (cartItemContainer) {
            // In that cart item container query the delivery-date container using query-selector
            const deliveryDateContainer =
              cartItemContainer.querySelector(".js-delivery-date");
            if (deliveryDateContainer) {
              const finalDate = selectedOption.dataset.deliveryDate;
              deliveryDateContainer.textContent = `Delivery date: ${finalDate}`;
            } else {
              console.log("Targeted .js-delivery-date container not FOUND !");
            }
          } else {
            console.log("closest .js-item-container not FOUND !");
          }
        }
      });
    });
  });
});

// making finalDate Interactive
document.addEventListener("DOMContentLoaded", () => {
  const now = dayjs();
  cart.forEach((product) => {
    const finalDate = document.querySelector(`.js-finaldate-${product.id}`);
    let deliveryOptionId;
    deliveryOptionId = product.deliveryOptionId;
    let daysToAdd;
    if (deliveryOptionId == 1) {
      daysToAdd = 7;
    } else if (deliveryOptionId == 2) {
      daysToAdd = 3;
    } else {
      daysToAdd = 1;
    }
    const newDate = now.add(daysToAdd, "day");
    const deliveryDate = newDate.format("dddd, MMMM D");
    finalDate.textContent = `Delivery date: ${deliveryDate}`;
  });
});
