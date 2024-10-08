import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js"; // Named Exports
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { updatedQuantity } from "../data/cart.js";
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
                    Quantity: <span class="quantity-label js-quantity-label">${
                      cartItem.quantity
                    }</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  cartItem.id
                }">Update</span>
                <input class="quantity-input js-quantity-input">
                <span class="save-quantity-link link-primary js-save-quantitylink">Save</span>
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

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    if (event.target.matches(".js-delivery-option-input")) {
      // Get the clicked delivery option
      const selectedOption = event.target;
      const newDeliveryOptionId = selectedOption.value;
      // Find the closest cart item container
      const cartItemContainer = selectedOption.closest(".js-item-container");
      const productId = cartItemContainer.id;
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
      updateDeliveryOption(productId, newDeliveryOptionId);
    }
  });
});

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
    renderPaymentSummary();
    checkoutQuantity();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((deliveryOption) => {
  deliveryOption.addEventListener("click", (event) => {
    const selectedOption = event.target.closest(".js-delivery-option");
    const finalDate = selectedOption.dataset.finalDate;
    const input = deliveryOption.querySelector(".js-delivery-option-input");
    const newDeliveryOptionId = input.value;
    if (input) {
      input.checked = true;
    }
    const cartItemContainer = selectedOption.closest(".js-item-container");
    const productId = cartItemContainer.id;
    const deliveryDate = cartItemContainer.querySelector(".js-delivery-date");
    deliveryDate.textContent = `Delivery date: ${finalDate}`;
    updateDeliveryOption(productId, newDeliveryOptionId);
    renderPaymentSummary();
  });
});

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
  checkoutQuantity();
});

// PayMent Summary
function renderPaymentSummary() {
  let totalPrice = 0;
  let totalShippingCharges = 0;
  let totalItems = 0;
  cart.forEach((cartItem) => {
    let matchingProduct;
    products.forEach((product) => {
      if (cartItem.id === product.id) {
        matchingProduct = product;
      }
    });
    totalPrice += cartItem.quantity * matchingProduct.priceCents;

    let matchingOption;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        matchingOption = option;
      }
    });
    totalShippingCharges += matchingOption.priceCents;
    totalItems += cartItem.quantity;
  });
  const totalPriceBeforeTax = totalPrice + totalShippingCharges;
  const estimatedTax = totalPriceBeforeTax * 0.1;
  const printedTax = estimatedTax.toFixed(2);
  const orderTotal = totalPriceBeforeTax + estimatedTax;
  const printedOrderTotal = orderTotal.toFixed(2);

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalItems}):</div>
        <div class="payment-summary-money">${totalPrice}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${totalShippingCharges}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${totalPriceBeforeTax}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">${printedTax}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">₹${printedOrderTotal}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}

renderPaymentSummary();

// checkout items header
function checkoutQuantity() {
  let totalItems = 0;
  cart.forEach((cartItem) => {
    totalItems += Number(cartItem.quantity);
  });
  document.querySelector(
    ".js-return-tohome-link"
  ).textContent = `${totalItems} items`;
}

// Update Btn's
document.addEventListener("DOMContentLoaded", () => {
  const updateBtns = document.querySelectorAll(".js-update-link");
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const cartItemContainer = updateBtn.closest(".cart-item-container");
      const quantityInput =
        cartItemContainer.querySelector(".js-quantity-input");
      const saveBtn = cartItemContainer.querySelector(".js-save-quantitylink");
      const quantityLabel =
        cartItemContainer.querySelector(".js-quantity-label");
      // show the inputBox and saveBtn
      quantityInput.classList.add("visible");
      saveBtn.classList.add("visible");
      // hide the updateBtn
      updateBtn.classList.add("no-visible");

      function saveHandler() {
        const newQuantity = quantityInput.value;
        const numericValue = Number(newQuantity);
        // hide the inputBtn and saveBtn
        quantityInput.classList.remove("visible");
        saveBtn.classList.remove("visible");
        // again show the updateBtn
        updateBtn.classList.remove("no-visible");

        if (
          // condition for strictly inputed QUANTITY
          newQuantity !== "" &&
          !isNaN(numericValue) &&
          Number.isInteger(numericValue) &&
          numericValue > 0 &&
          newQuantity === String(numericValue)
        ) {
          // adding newQuantity to the cart
          updatedQuantity(productId, newQuantity);
          // re-generateHTML for chekout header Quantity
          checkoutQuantity();
          // re-generateHTML for the payment-summary
          renderPaymentSummary();
          // update the quantityLabel also
          quantityLabel.textContent = numericValue;
        } else {
          alert(
            "! Please enter a valid QUANTITY :- It must be a positive whole number without EXTRA-SPACES !"
          );
        }
        // clear the quantity-input
        quantityInput.value = "";
        // firstly remove all previous eventListners
        saveBtn.removeEventListener("click", saveHandler);
        quantityInput.removeEventListener("keydown", enterHandler);
      }
      function enterHandler(event) {
        if (event.key === "Enter") {
          saveHandler();
        }
      }
      // firstly remove all previous eventListners
      saveBtn.removeEventListener("click", saveHandler);
      quantityInput.removeEventListener('keydown', enterHandler);

      saveBtn.addEventListener('click',saveHandler);
      quantityInput.addEventListener('keydown',enterHandler);
    });
  });
});
