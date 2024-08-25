// creating the cartArray for a list of products
export const cart = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productName:'Black and Gray Athletic Cotton Socks - 6 Pairs',
    quantity: 1
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    productName:'Intermediate Size Basketball',
    quantity: 2
  }
];

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
  }
  