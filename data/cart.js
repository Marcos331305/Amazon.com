// creating the cartArray for a list of products
export let cart = JSON.parse(localStorage.getItem("cart"));

/*
function to add the product in the cart if it not in the cart. And if the product is already in the cart then it will only update the quantity.
*/
export function addToCart(productId, productName) {
  if (cart !== null) {
    let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.id) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        productName: productName,
        quantity: 1,
      });
    }
    saveToStorage();
  } else if (cart === null) {
    saveToStorage(productId, productName);
  }
}

export function removeFromCart(itemId) {
  const updatedCart = cart.filter((product) => {
    return product.id !== itemId;
  });
  cart = updatedCart;
  saveToStorage();
}

function saveToStorage(productId, productName) {
  if (productId && productName) {
    if (!cart) {
      cart = [];
      cart.push({
        id: productId,
        productName: productName,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
