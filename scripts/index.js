// Importing neccessary Identifiers(variables,functions...) from other Js-Module files
import { cart,addToCart } from "../data/cart.js";
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

/*
The main idea of JS for generating the HTML elements to show the products or anything else on the webpage is :-
1.Save the data in JS (About your HTML elements(like products here) that you want to show on the webpage through JS)
2.Generage the HTML
3.Put it on the Webpage + Make it interactive
*/

/*
1.Save data of products in js so that we can generate html elements of products through JS
*/
// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87
//     },
//     priceInr: 499
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127
//     },
//     priceInr: 1199
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56
//     },
//     priceInr: 799
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197
//     },
//     priceInr: 1399,
//   }
// ];
/*
---> I have commented/deleted the upper-products array because I have another file named as products.js in which i have enough products data to work in an array and i want to use that products array in this file to generate the appropriate HTML.
2.
---> Now we can use this data to generate html elements through js insted of writing them manually in HTML
---> We also combine the entire html that we have generated before to display on the webpage
*/
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

/*
3.
---> Now we can put the entire HTML on Webpage to show the all products on the webpage
---> Fetch the appropraite Html element in which we want to show our all products using DOM and insert the entire HTML of Products that we have generated before
*/
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// function for calculating & updating the cartQuantity on the page
  function updateCartQuantity(){
    // Calculate the total cart quantity
    let totalQuantity = 0;
    cart.forEach((item) => {
      console.log(item);
      totalQuantity += item.quantity;
    });
    // Upadate the totalQuantity in the cart-logo
    document.querySelector(".js-cart-quantity-smallDevices").innerHTML =
      totalQuantity;
    document.querySelector(".js-cart-quantity").innerHTML = totalQuantity;
}

// Make it interactive by adding the functionality to addCart btn
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    // Call the addToCart function for adding the products in the cart
    addToCart(productId,productName);
    // call the updateCartQuantity function for updating the cartQuantity on the page
    updateCartQuantity();
  });
});

/*
JS ---> Modules
How to create Modules in JS :-
1. we need to create a seperate js file in which we write the code with the "export"-statement which we want to use outside the file(in other files). And the important thing is that don't load this file with script-tag because we use it as module to use it's code ouside it(or in another files). -> 'This file will be your module'.
2. Then we go that file in which we want to use that exported code for that we write the "import"-statement with the names of variables,function or anything else we want to import . we also write the path of the file from which we are including the code of that appropriate identifier that we have mentioned in the "import"-statement.
**NOTE => The most important thing is that you have to mention the attribute in the script tag of that file in which we have used the "import"-statements. if you are getting the error of "you can't use import statements outside a module". Because in JS bydefault files are not considered as 'modules'.
*/
