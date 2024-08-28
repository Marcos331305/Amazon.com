// creating the cartArray for a list of products
export let cart = JSON.parse(localStorage.getItem("cart"));

// export let cart = [
//   {
//     id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     quantity: 1,
//     deliveryOptionId: '1'
//   },
//   {
//     id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     productName: 'Intermediate Size Basketball',
//     quantity: 2,
//     deliveryOptionId: '2'
//   }
// ];

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
        deliveryOptionId: "1",
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
        deliveryOptionId: "1"
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function updateDeliveryOption(productId, newDeliveryOptionId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingProduct = cartItem;
    }
  });
  matchingProduct.deliveryOptionId = newDeliveryOptionId;

  saveToStorage();
}
