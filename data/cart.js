// creating the cartArray for a list of products
export const cart = [];

/*
function to add the product in the cart if it not in the cart. And if the product is already in the cart then it will only update the quantity.
*/
export function addToCart(productId,productName) {
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
    console.log(cart);
  }
  